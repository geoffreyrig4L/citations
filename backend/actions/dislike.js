import prisma from "../prisma/prisma.js";

export const createDislike = async (dislike) => {
  console.log(dislike);
  return await prisma.dislike.create({ data: dislike });
};

export const deleteDislike = async (id) => {
  return await prisma.dislike.delete({ where: { id: id } });
};
