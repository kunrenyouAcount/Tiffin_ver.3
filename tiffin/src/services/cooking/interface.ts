import { MasterCooking } from "@prisma/client";

export interface ICookingService {
  findAll(): Promise<MasterCooking[]>;
  getByGenre(genreId: number): Promise<MasterCooking[]>;
}
