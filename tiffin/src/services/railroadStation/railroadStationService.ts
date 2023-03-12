import { MasterRailroadStation, PrismaClient } from "@prisma/client";
import { IRailroadStationService } from "./interface";

export class RailroadStationService implements IRailroadStationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findAll(): Promise<MasterRailroadStation[]> {
    const result = await this.prisma.masterRailroadStation.findMany();
    return result;
  }

  public async getByPrefectureId(prefectureId: number): Promise<MasterRailroadStation[]> {
    const result = await this.prisma.masterRailroadStation.findMany({
      where: {
        masterPrefectureId: prefectureId,
      },
    });
    return result;
  }
}
