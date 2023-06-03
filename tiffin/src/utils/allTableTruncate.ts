import { Prisma, PrismaClient } from "@prisma/client";

export async function truncate(prisma: PrismaClient) {
  // 外部キーを無効化
  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=0`;

  const tableNames = Prisma.dmmf.datamodel.models.map((model) => model.dbName) as Prisma.ModelName[];
  for (const tableName of tableNames) {
    const query = `TRUNCATE TABLE ${tableName}`;
    await prisma.$queryRawUnsafe(query);
  }

  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=1`;
}
