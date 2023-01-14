import { Genre } from "../../models/genre";
import { DetailedGenre } from "../../models/detailedGenre";
import { Cooking } from "../../models/cooking";
import { IGenreRepository } from "../../repositories/genre/interface";
import { IDetailedGenreRepository } from "../../repositories/detailedGenre/interface";
import { ICookingRepository } from "../../repositories/cooking/interface";
import { IEatingService } from "./interface";

export class EatingService implements IEatingService {
  private genreRepository: IGenreRepository;
  private detailedGenreRepository: IDetailedGenreRepository;
  private cookingRepository: ICookingRepository;

  constructor(
    genreRepository: IGenreRepository,
    detailedGenreRepository: IDetailedGenreRepository,
    cookingRepository: ICookingRepository
  ) {
    this.genreRepository = genreRepository;
    this.detailedGenreRepository = detailedGenreRepository;
    this.cookingRepository = cookingRepository;
  }

  public async searchByKeyword(keyword: string): Promise<
    | Error
    | {
        genres: Genre[];
        detailedGenres: DetailedGenre[];
        cookings: Cooking[];
      }
  > {
    const genreResult = await this.genreRepository.searchByKeyword(keyword);
    if (genreResult instanceof Error) {
      return genreResult;
    }
    const detailedGenreResult = await this.detailedGenreRepository.searchByKeyword(keyword);
    if (detailedGenreResult instanceof Error) {
      return detailedGenreResult;
    }
    const cookingResult = await this.cookingRepository.searchByKeyword(keyword);
    if (cookingResult instanceof Error) {
      return cookingResult;
    }
    return {
      genres: genreResult,
      detailedGenres: detailedGenreResult,
      cookings: cookingResult,
    };
  }
}
