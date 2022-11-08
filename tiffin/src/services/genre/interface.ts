import { Genre } from "../../models/genre";

export interface IGenreService {
  findAll(): Promise<Genre[] | Error>;
}
