import prisma from "../prisma/prisma.js";

export const getAllQuote = async (sortBy) => {
  const orderBy =
    sortBy == "like"
      ? { like: { _count: "desc" } }
      : sortBy == "disLike"
      ? { dislike: { _count: "desc" } }
      : { createdAt: "desc" };

  const quotes = await prisma.quote.findMany({
    orderBy: { ...orderBy },
    include: {
      dislike: true,
      like: true,
      user: { include: { approved: true } },
    },
  });

  if (quotes.length == 0) {
    sendError();
  }

  return quotes;
};

export const getQuote = async (id) => {
  const quote = await prisma.quote.findUnique({
    where: { id: id },
    include: {
      dislike: true,
      like: true,
      user: { include: { approved: true } },
    },
  });

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
