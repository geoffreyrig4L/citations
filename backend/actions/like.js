import prisma from "../prisma/prisma.js";

export const createLike = async (like) => {
  // await prisma.dislike.deleteMany({
  //   where: { userId: like.userId, quoteId: like.quoteId },
  // });

  return await prisma.like.create({ data: like });
};

export const deleteLike = async (id) => {
  return await prisma.like.delete({ where: { id: id } });
};
