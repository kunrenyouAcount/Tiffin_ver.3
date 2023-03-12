import { MasterGenre, PrismaClient } from "@prisma/client";
import { IGenreService } from "./interface";

export class GenreService implements IGenreService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findAll(): Promise<MasterGenre[]> {
    return await this.prisma.masterGenre.findMany();
  }
}
