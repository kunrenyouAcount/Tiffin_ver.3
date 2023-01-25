import { Genre } from "../../models/genre";
import { Cooking } from "../../models/cooking";
import { IGenreRepository } from "../../repositories/genre/interface";
import { ICookingRepository } from "../../repositories/cooking/interface";
import { IEatingService } from "./interface";

export class EatingService implements IEatingService {
  private genreRepository: IGenreRepository;
  private cookingRepository: ICookingRepository;

  constructor(genreRepository: IGenreRepository, cookingRepository: ICookingRepository) {
    this.genreRepository = genreRepository;
    this.cookingRepository = cookingRepository;
  }

  public async searchByKeyword(keyword: string): Promise<
    | Error
    | {
        genres: Genre[];
        cookings: Cooking[];
      }
  > {
    const genreResult = await this.genreRepository.searchByKeyword(keyword);
    if (genreResult instanceof Error) {
      return genreResult;
    }
    const cookingResult = await this.cookingRepository.searchByKeyword(keyword);
    if (cookingResult instanceof Error) {
      return cookingResult;
    }
    return {
      genres: genreResult,
      cookings: cookingResult,
    };
  }
}
