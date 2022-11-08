import { DetailedGenre } from "../../models/detailedGenre";
import { IDetailedGenreRepository } from "../../repositories/detailedGenre/interface";
import { IDetailedGenreService } from "./interface";

export class DetailedGenreService implements IDetailedGenreService {
  private detailedGenreRepository: IDetailedGenreRepository;

  constructor(detailedGenreRepository: IDetailedGenreRepository) {
    this.detailedGenreRepository = detailedGenreRepository;
  }

  public async getByGenreId(genreId: number): Promise<DetailedGenre[] | Error> {
    const result = await this.detailedGenreRepository.getByGenreId(genreId);
    return result;
  }
}
