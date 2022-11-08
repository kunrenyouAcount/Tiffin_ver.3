import { Genre } from "../../models/genre";

export interface IGenreRepository {
  findAll(): Promise<Genre[] | Error>;
}
