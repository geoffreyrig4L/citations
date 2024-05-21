import prisma from "../prisma/prisma.js";

export const createLike = async (like) => {
  return await prisma.like.create({ data: like });
};

export const deleteLike = async (id) => {
  return await prisma.like.delete({ where: { id: id } });
};
