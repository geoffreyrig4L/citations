import prisma from "./prisma.js";
import { faker } from "@faker-js/faker";

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        quotes: {
          create: [
            {
              quote: faker.lorem.sentence(),
              author: faker.person.fullName(),
            },
            {
              quote: faker.lorem.sentence(),
              author: faker.person.fullName(),
            },
          ],
        },
      },
    });
  }

  for (let i = 0; i < 200; i++) {
    const quote = await getRandomQuote();
    const user = await getRandomUser();

    await prisma.like.create({
      data: {
        userId: user.id,
        quoteId: quote.id,
      },
    });
  }

  for (let i = 0; i < 200; i++) {
    const quote = await getRandomQuote();
    const user = await getRandomUser();

    await prisma.dislike.create({
      data: {
        userId: user.id,
        quoteId: quote.id,
      },
    });
  }

  for (let i = 0; i < 120; i++) {
    const user = await getRandomUser();
    const user2 = await getRandomUser();

    console.log(user2);

    await prisma.approved.create({
      data: {
        userId: user.id,
        approvedById: user2.id,
      },
    });
  }
}

async function getRandomQuote() {
  const totalQuotes = await prisma.quote.count();
  const randomOffset = Math.floor(Math.random() * totalQuotes);
  const randomQuote = await prisma.quote.findFirst({
    skip: randomOffset,
  });
  return randomQuote;
}

async function getRandomUser() {
  const totalUsers = await prisma.user.count();
  const randomOffset = Math.floor(Math.random() * totalUsers);
  const randomUser = await prisma.user.findFirst({
    skip: randomOffset,
  });
  return randomUser;
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
