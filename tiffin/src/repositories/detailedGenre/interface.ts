import { DetailedGenre } from "../../models/detailedGenre";

export interface IDetailedGenreRepository {
  getByGenreId(genreId: number): Promise<DetailedGenre[] | Error>;
}
