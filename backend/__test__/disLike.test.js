import { createDislike, deleteDislike } from "../actions/dislike.js";
import prisma from "../prisma/prisma.js";

jest.mock("../prisma/prisma.js", () => ({
  dislike: {
    create: jest.fn(),
    delete: jest.fn(),
  },
  // Si vous souhaitez réactiver la suppression des likes
  like: {
    deleteMany: jest.fn(),
  },
}));

describe("createDislike function", () => {
  it("should create a dislike record successfully", async () => {
    const dislike = { userId: "user1", quoteId: "quote1" };
    const mockDislikeRecord = { id: 1, ...dislike };

    prisma.dislike.create.mockResolvedValue(mockDislikeRecord);

    const result = await createDislike(dislike);

    expect(prisma.dislike.create).toHaveBeenCalledWith({ data: dislike });
    expect(result).toEqual(mockDislikeRecord);
  });

  // it('should delete related likes successfully', async () => {
  //   const dislike = { userId: 'user1', quoteId: 'quote1' };

  //   prisma.like.deleteMany.mockResolvedValue({ count: 1 });
  //   prisma.dislike.create.mockResolvedValue({ id: 1, ...dislike });

  //   const result = await createDislike(dislike);

  //   expect(prisma.like.deleteMany).toHaveBeenCalledWith({
  //     where: { userId: dislike.userId, quoteId: dislike.quoteId },
  //   });
  //   expect(result).toEqual({ id: 1, ...dislike });
  // });
});

describe("deleteDislike function", () => {
  it("should delete a dislike record successfully", async () => {
    const id = 1;
    const mockDislikeRecord = { id, userId: "user1", quoteId: "quote1" };
    prisma.dislike.delete.mockResolvedValue(mockDislikeRecord);

    const result = await deleteDislike(id);

    expect(prisma.dislike.delete).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(mockDislikeRecord);
  });

  it("should throw an error if the dislike record is not found", async () => {
    const id = 1;

    prisma.dislike.delete.mockRejectedValue(new Error("Record not found"));

    await expect(deleteDislike(id)).rejects.toThrow("Record not found");
  });
});
