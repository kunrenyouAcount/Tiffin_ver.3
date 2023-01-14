import { Genre } from "../../models/genre";
import { DetailedGenre } from "../../models/detailedGenre";
import { Cooking } from "../../models/cooking";

export interface IEatingService {
  searchByKeyword(keyword: string): Promise<
    | {
        genres: Genre[];
        detailedGenres: DetailedGenre[];
        cookings: Cooking[];
      }
    | Error
  >;
}
