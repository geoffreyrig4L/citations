import prisma from "./prisma.js";
import { faker } from "@faker-js/faker";

async function main() {
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        quotes: {
          create: {
            quote: faker.lorem.sentence(),
            author: faker.person.fullName(),
          },
        },
      },
    });

    const quote = await prisma.quote.findFirst();

    await prisma.like.create({
      data: {
        userId: user.id,
        quoteId: quote.id,
      },
    });

    await prisma.dislike.create({
      data: {
        userId: user.id,
        quoteId: quote.id,
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
