import { MasterGenre } from "@prisma/client";

export interface IGenreService {
  findAll(): Promise<MasterGenre[]>;
}
