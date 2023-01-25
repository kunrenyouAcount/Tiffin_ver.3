import { Genre } from "../../models/genre";
import { Cooking } from "../../models/cooking";

export interface IEatingService {
  searchByKeyword(keyword: string): Promise<
    | {
        genres: Genre[];
        cookings: Cooking[];
      }
    | Error
  >;
}
