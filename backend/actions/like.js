import prisma from "../prisma/prisma.js";

export const createLike = async (like) => {
  const dislikes = await prisma.dislike.findMany({
    where: { userId: like.userId, quoteId: like.quoteId },
  });

  if (dislikes.length > 0) {
    await prisma.dislike.deleteMany({
      where: { id: { in: dislikes.map((dislike) => dislike.id) } },
    });
  }

  return await prisma.like.create({ data: like });
};

export const deleteLike = async (id) => {
  return await prisma.like.delete({ where: { id: id } });
};
