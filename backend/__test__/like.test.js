import { createLike, deleteLike } from "../actions/like.js";
import prisma from "../prisma/prisma.js";

jest.mock("../prisma/prisma.js", () => ({
  like: {
    create: jest.fn(),
    delete: jest.fn(),
  },
  dislike: {
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

describe("createLike function", () => {
  it("should create a like record successfully when no dislikes exist", async () => {
    const like = { userId: "user1", quoteId: "quote1" };
    const mockLikeRecord = { id: 1, ...like };

    prisma.dislike.findMany.mockResolvedValue([]);
    prisma.like.create.mockResolvedValue(mockLikeRecord);

    const result = await createLike(like);

    expect(prisma.dislike.findMany).toHaveBeenCalledWith({
      where: { userId: like.userId, quoteId: like.quoteId },
    });
    expect(prisma.like.create).toHaveBeenCalledWith({ data: like });
    expect(result).toEqual(mockLikeRecord);
  });

  it("should delete related dislikes and create a like record successfully", async () => {
    const like = { userId: "user1", quoteId: "quote1" };
    const mockLikeRecord = { id: 1, ...like };
    const mockDislikeRecords = [{ id: 1 }, { id: 2 }];

    prisma.dislike.findMany.mockResolvedValue(mockDislikeRecords);
    prisma.dislike.deleteMany.mockResolvedValue({
      count: mockDislikeRecords.length,
    });
    prisma.like.create.mockResolvedValue(mockLikeRecord);

    const result = await createLike(like);

    expect(prisma.dislike.findMany).toHaveBeenCalledWith({
      where: { userId: like.userId, quoteId: like.quoteId },
    });
    expect(prisma.dislike.deleteMany).toHaveBeenCalledWith({
      where: { id: { in: mockDislikeRecords.map((dislike) => dislike.id) } },
    });
    expect(prisma.like.create).toHaveBeenCalledWith({ data: like });
    expect(result).toEqual(mockLikeRecord);
  });

  it("should throw an error if like creation fails", async () => {
    const like = { userId: "user1", quoteId: "quote1" };

    prisma.dislike.findMany.mockResolvedValue([]);
    prisma.like.create.mockRejectedValue(new Error("Creation failed"));

    await expect(createLike(like)).rejects.toThrow("Creation failed");
  });
});

describe("deleteLike function", () => {
  it("should delete a like record successfully", async () => {
    const id = 1;
    const mockLikeRecord = { id, userId: "user1", quoteId: "quote1" };

    prisma.like.delete.mockResolvedValue(mockLikeRecord);

    const result = await deleteLike(id);

    expect(prisma.like.delete).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(mockLikeRecord);
  });

  it("should throw an error if the like record is not found", async () => {
    const id = 1;

    prisma.like.delete.mockRejectedValue(new Error("Record not found"));

    await expect(deleteLike(id)).rejects.toThrow("Record not found");
  });
});
