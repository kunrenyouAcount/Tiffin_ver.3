import { Cooking } from "../../models/cooking";

export interface ICookingRepository {
  findAll(): Promise<Cooking[] | Error>;
  getByGenre(genreId: number): Promise<Cooking[] | Error>;
  searchByKeyword(keyword: string): Promise<Cooking[] | Error>;
}
