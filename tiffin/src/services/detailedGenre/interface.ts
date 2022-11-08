import { DetailedGenre } from "../../models/detailedGenre";

export interface IDetailedGenreService {
  getByGenreId(genreId: number): Promise<DetailedGenre[] | Error>;
}
