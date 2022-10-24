import { Cooking } from "../../models/cooking";

export interface ICookingRepository {
  findAll(): Promise<Cooking[] | Error>;
  getByGenre(genreId: number): Promise<Cooking[] | Error>;
  getByDetailedGenre(detailedGenreId: number): Promise<Cooking[] | Error>;
}
