import prisma from "../prisma/prisma.js";

export const getAllQuote = async () => {
  const quotes = await prisma.quote.findMany();

  if (quotes.length == 0) {
    sendError();
  }

  return quotes;
};

export const getQuote = async (id) => {
  const quote = await prisma.quote.findUnique({ where: { id: id } });

  if (!quote) {
    sendError();
  }

  return quote;
};

export const createQuote = async (quote) => {
  return await prisma.quote.create({ data: quote });
};

export const updateQuote = async (id, quote) => {
  return await prisma.quote.update({ where: { id: id }, data: quote });
};

export const deleteQuote = async (id) => {
  return await prisma.quote.delete({ where: { id: id } });
};

const sendError = (msg) => {
  throw new Error(msg ? msg : "An error occurred");
};
