import {
  MasterArea,
  MasterCooking,
  MasterDetailedArea,
  MasterGenre,
  MasterPrefecture,
  MasterRailroadStation,
  PrismaClient,
} from "@prisma/client";
import { IKeywordSearchService } from "./interface";

export class KeywordSearchService implements IKeywordSearchService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async searchPlace(keyword: string): Promise<{
    prefectures: MasterPrefecture[];
    areas: MasterArea[];
    detailedAreas: MasterDetailedArea[];
    stations: MasterRailroadStation[];
  }> {
    const prefectures = await this.prisma.masterPrefecture.findMany({
      where: {
        name: keyword,
      },
    });
    const areas = await this.prisma.masterArea.findMany({
      where: {
        name: keyword,
      },
    });
    const detailedAreas = await this.prisma.masterDetailedArea.findMany({
      where: {
        name: keyword,
      },
    });
    const stations = await this.prisma.masterRailroadStation.findMany({
      where: {
        name: keyword,
      },
    });
    return {
      prefectures: prefectures,
      areas: areas,
      detailedAreas: detailedAreas,
      stations: stations,
    };
  }

  public async searchEating(keyword: string): Promise<{ genres: MasterGenre[]; cookings: MasterCooking[] }> {
    const genres = await this.prisma.masterGenre.findMany({
      where: {
        name: keyword,
      },
    });
    const cookings = await this.prisma.masterCooking.findMany({
      where: {
        name: keyword,
      },
    });
    return {
      genres: genres,
      cookings: cookings,
    };
  }
}
