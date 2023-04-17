import { PrismaClient } from "@prisma/client";
import { main } from "./seed";
const prisma = new PrismaClient();

main(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
