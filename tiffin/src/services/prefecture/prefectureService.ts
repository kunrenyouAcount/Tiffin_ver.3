import { MasterPrefecture, PrismaClient } from "@prisma/client";
import { IPrefectureService } from "./interface";

export class PrefectureService implements IPrefectureService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findAll(): Promise<MasterPrefecture[]> {
    const result = await this.prisma.masterPrefecture.findMany();
    return result;
  }

  public async getById(id: number): Promise<MasterPrefecture | null> {
    const result = await this.prisma.masterPrefecture.findFirst({
      where: {
        id,
      },
    });
    return result;
  }
}
