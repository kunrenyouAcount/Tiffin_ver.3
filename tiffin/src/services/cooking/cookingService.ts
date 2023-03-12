import { MasterCooking, PrismaClient } from "@prisma/client";
import { ICookingService } from "./interface";

export class CookingService implements ICookingService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getByGenre(genreId: number): Promise<MasterCooking[]> {
    const result = await this.prisma.masterCooking.findMany({
      where: {
        MasterGenreMasterCooking: {
          every: {
            masterGenreId: genreId,
          },
        },
      },
    });
    return result;
  }

  public async findAll(): Promise<MasterCooking[]> {
    const result = await this.prisma.masterCooking.findMany();
    return result;
  }
}
