import prisma from "../prisma/prisma.js";

export const approved = async (user1, user2) => {
  const approved = await prisma.approved.create({
    data: { userId: user1, approvedById: user2 },
  });

  if (!approved) {
    throw new Error("an Error occured");
  }

  return approved;
};

export const unapproved = async (user1, user2) => {
  const recordToDelete = await prisma.approved.findFirst({
    where: {
      userId: user1,
      approvedById: user2,
    },
  });

  return await prisma.approved.delete({
    where: { id: recordToDelete.id },
  });
};
