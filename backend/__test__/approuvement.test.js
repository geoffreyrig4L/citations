const { approved, unapproved } = require("../actions/approvement.js");
const prisma = require("../prisma/prisma.js");

jest.mock("../prisma/prisma.js", () => ({
  approved: {
    create: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("approved function", () => {
  it("should create an approved record successfully", async () => {
    const user1 = "user1";
    const user2 = "user2";
    const mockApprovedRecord = { id: 1, userId: user1, approvedById: user2 };

    prisma.approved.create.mockResolvedValue(mockApprovedRecord);

    const result = await approved(user1, user2);

    expect(prisma.approved.create).toHaveBeenCalledWith({
      data: { userId: user1, approvedById: user2 },
    });
    expect(result).toEqual(mockApprovedRecord);
  });

  it("should throw an error if the approved record is not created", async () => {
    const user1 = "user1";
    const user2 = "user2";

    prisma.approved.create.mockResolvedValue(null);

    await expect(approved(user1, user2)).rejects.toThrow("an Error occured");
  });
});

describe("unapproved function", () => {
  it("should delete an approved record successfully", async () => {
    const user1 = "user1";
    const user2 = "user2";
    const mockApprovedRecord = { id: 1, userId: user1, approvedById: user2 };

    prisma.approved.findFirst.mockResolvedValue(mockApprovedRecord);
    prisma.approved.delete.mockResolvedValue(mockApprovedRecord);

    const result = await unapproved(user1, user2);

    expect(prisma.approved.findFirst).toHaveBeenCalledWith({
      where: { userId: user1, approvedById: user2 },
    });
    expect(prisma.approved.delete).toHaveBeenCalledWith({
      where: { id: mockApprovedRecord.id },
    });
    expect(result).toEqual(mockApprovedRecord);
  });

  it("should throw an error if the record to delete is not found", async () => {
    const user1 = "user1";
    const user2 = "user2";

    prisma.approved.findFirst.mockResolvedValue(null);

    await expect(unapproved(user1, user2)).rejects.toThrow();
  });
});
