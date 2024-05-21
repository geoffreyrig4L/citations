import prisma from "../prisma/prisma.js";

export const createDislike = async (dislike) => {
  // await prisma.like.deleteMany({
  //   where: { userId: dislike.userId, quoteId: dislike.quoteId },
  // });
  return await prisma.dislike.create({ data: dislike });
};

export const deleteDislike = async (id) => {
  return await prisma.dislike.delete({ where: { id: id } });
};
