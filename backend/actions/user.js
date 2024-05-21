import prisma from "../prisma/prisma.js";

export const signIn = async (username) => {
  const user = await prisma.user.findUnique({ where: { name: username } });

  if (!user) {
    throw new Error("no user associate at this username");
  }

  return user;
};

export const signUp = async (username) => {
  return await prisma.user.create({ data: { name: username } });
};
