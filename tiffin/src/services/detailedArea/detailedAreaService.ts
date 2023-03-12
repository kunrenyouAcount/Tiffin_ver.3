import { MasterDetailedArea, PrismaClient } from "@prisma/client";
import { IDetailedAreaService } from "./interface";

export class DetailedAreaService implements IDetailedAreaService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findAll(): Promise<MasterDetailedArea[]> {
    const result = await this.prisma.masterDetailedArea.findMany();
    return result;
  }

  public async getByAreaId(areaId: number): Promise<MasterDetailedArea[]> {
    const result = await this.prisma.masterDetailedArea.findMany({
      where: {
        masterAreaId: areaId,
      },
    });
    return result;
  }
}
