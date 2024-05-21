import prisma from "./prisma.js";
import { faker } from "@faker-js/faker";

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
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
  }

  // for (let i = 0; i < 200; i++) {
  //   const quote = await getRandomQuote();
  //   const user = await getRandomUser();

  //   await prisma.like.create({
  //     data: {
  //       userId: user.id,
  //       quoteId: quote.id,
  //     },
  //   });
  // }

  // for (let i = 0; i < 200; i++) {
  //   const quote = await getRandomQuote();
  //   const user = await getRandomUser();

  //   await prisma.dislike.create({
  //     data: {
  //       userId: user.id,
  //       quoteId: quote.id,
  //     },
  //   });
  // }
}

// async function getRandomQuote() {
//   const totalQuotes = await prisma.quote.count();
//   const randomOffset = Math.floor(Math.random() * totalQuotes);
//   const randomQuote = await prisma.quote.findFirst({
//     skip: randomOffset,
//   });
//   return randomQuote;
// }

// async function getRandomUser() {
//   const totalUsers = await prisma.user.count();
//   const randomOffset = Math.floor(Math.random() * totalUsers);
//   const randomUser = await prisma.user.findFirst({
//     skip: randomOffset,
//   });
//   return randomUser;
// }

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
