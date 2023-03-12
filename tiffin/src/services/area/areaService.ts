import { MasterArea, PrismaClient } from "@prisma/client";
import { IAreaService } from "./interface";

export class AreaService implements IAreaService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findAll(): Promise<MasterArea[]> {
    return await this.prisma.masterArea.findMany();
  }

  public async getByPrefectureId(prefectureId: number): Promise<MasterArea[]> {
    return await this.prisma.masterArea.findMany({
      where: { masterPrefectureId: prefectureId },
    });
  }
}
