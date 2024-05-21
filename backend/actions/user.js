import prisma from "../prisma/prisma.js";

export const signIn = async (username) => {
  const user = await prisma.user.findUnique({ where: { username: username } });

  if (!user) {
    throw new Error("no user associate at this username");
  }

  return user;
};

export const signUp = async (username, name) => {
  return await prisma.user.create({ data: { username: username, name: name } });
};

export const getUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: { approved: true, like: true, dislike: true, quotes: true },
  });

  if (!user) {
    throw new Error("An error occurred");
  }

  return user;
};
