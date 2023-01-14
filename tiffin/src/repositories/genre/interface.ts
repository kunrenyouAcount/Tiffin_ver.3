import { Genre } from "../../models/genre";

export interface IGenreRepository {
  findAll(): Promise<Genre[] | Error>;
  searchByKeyword(keyword: string): Promise<Genre[] | Error>;
}
