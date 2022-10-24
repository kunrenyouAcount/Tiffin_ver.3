import { Cooking } from "../../models/cooking";

export interface ICookingService {
  findAll(): Promise<Cooking[] | Error>;
  getByGenre(genreId: number): Promise<Cooking[] | Error>;
  getByDetailedGenre(detailedGenreId: number): Promise<Cooking[] | Error>;
}
