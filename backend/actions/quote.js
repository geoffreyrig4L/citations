import prisma from "../prisma/prisma.js";

export const getAllQuote = async () => {
  return await prisma.quote.findMany();
};
