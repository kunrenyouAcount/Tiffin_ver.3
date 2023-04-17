import { PrismaClient } from "@prisma/client";

export async function truncate(prisma: PrismaClient) {
  const allProperties = Object.keys(prisma);

  const modelNames = allProperties.filter((x) => !(typeof x === "string" && (x.startsWith("$") || x.startsWith("_"))));
  const tableNames = modelNames.map((modelName) => modelName.charAt(0).toUpperCase() + modelName.slice(1));
  // 外部キーを無効化
  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=0`;

  for (const tableName of tableNames) {
    const query = `TRUNCATE TABLE ${tableName}`;
    await prisma.$queryRawUnsafe(query);
  }

  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=1`;
}
