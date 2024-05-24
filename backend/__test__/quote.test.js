import {
  getAllQuote,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
} from "../actions/quote.js";
import prisma from "../prisma/prisma.js";

jest.mock("../prisma/prisma.js", () => ({
  quote: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const sendError = jest.fn((msg) => {
  throw new Error(msg || "An error occurred");
});

describe("getAllQuote function", () => {
  it("should return sorted quotes by like count", async () => {
    const mockQuotes = [
      { id: 1, text: "quote 1" },
      { id: 2, text: "quote 2" },
    ];
    prisma.quote.findMany.mockResolvedValue(mockQuotes);

    const result = await getAllQuote("like");

    expect(prisma.quote.findMany).toHaveBeenCalledWith({
      orderBy: { like: { _count: "desc" } },
      include: {
        dislike: true,
        like: true,
        user: { include: { approved: true } },
      },
    });
    expect(result).toEqual(mockQuotes);
  });

  it("should return sorted quotes by dislike count", async () => {
    const mockQuotes = [
      { id: 1, text: "quote 1" },
      { id: 2, text: "quote 2" },
    ];
    prisma.quote.findMany.mockResolvedValue(mockQuotes);

    const result = await getAllQuote("disLike");

    expect(prisma.quote.findMany).toHaveBeenCalledWith({
      orderBy: { dislike: { _count: "desc" } },
      include: {
        dislike: true,
        like: true,
        user: { include: { approved: true } },
      },
    });
    expect(result).toEqual(mockQuotes);
  });

  it("should return sorted quotes by creation date", async () => {
    const mockQuotes = [
      { id: 1, text: "quote 1" },
      { id: 2, text: "quote 2" },
    ];
    prisma.quote.findMany.mockResolvedValue(mockQuotes);

    const result = await getAllQuote();

    expect(prisma.quote.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
      include: {
        dislike: true,
        like: true,
        user: { include: { approved: true } },
      },
    });
    expect(result).toEqual(mockQuotes);
  });

  it("should throw an error if no quotes are found", async () => {
    prisma.quote.findMany.mockResolvedValue([]);

    await expect(getAllQuote()).rejects.toThrow("An error occurred");
  });
});

describe("getQuote function", () => {
  it("should return a quote by ID", async () => {
    const mockQuote = { id: 1, text: "quote 1" };
    prisma.quote.findUnique.mockResolvedValue(mockQuote);

    const result = await getQuote(1);

    expect(prisma.quote.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        dislike: true,
        like: true,
        user: { include: { approved: true } },
      },
    });
    expect(result).toEqual(mockQuote);
  });

  it("should throw an error if the quote is not found", async () => {
    prisma.quote.findUnique.mockResolvedValue(null);

    await expect(getQuote(1)).rejects.toThrow("An error occurred");
  });
});

describe("createQuote function", () => {
  it("should create a new quote", async () => {
    const newQuote = { text: "new quote" };
    const mockQuote = { id: 1, ...newQuote };

    prisma.quote.create.mockResolvedValue(mockQuote);

    const result = await createQuote(newQuote);

    expect(prisma.quote.create).toHaveBeenCalledWith({ data: newQuote });
    expect(result).toEqual(mockQuote);
  });
});

describe("updateQuote function", () => {
  it("should update an existing quote", async () => {
    const updatedQuote = { text: "updated quote" };
    const mockQuote = { id: 1, ...updatedQuote };

    prisma.quote.update.mockResolvedValue(mockQuote);

    const result = await updateQuote(1, updatedQuote);

    expect(prisma.quote.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedQuote,
    });
    expect(result).toEqual(mockQuote);
  });
});

describe("deleteQuote function", () => {
  it("should delete an existing quote", async () => {
    const mockQuote = { id: 1, text: "quote to delete" };

    prisma.quote.delete.mockResolvedValue(mockQuote);

    const result = await deleteQuote(1);

    expect(prisma.quote.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockQuote);
  });
});
