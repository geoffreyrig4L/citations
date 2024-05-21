import prisma from "../prisma/prisma.js";

export const signIn = async (username) => {
  const user = await prisma.user.findUnique({ where: { name: username } });
};

export const signUp = () => {};
