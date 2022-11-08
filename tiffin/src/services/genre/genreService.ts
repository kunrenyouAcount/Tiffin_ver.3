import { Genre } from "../../models/genre";
import { IGenreRepository } from "../../repositories/genre/interface";
import { IGenreService } from "./interface";

export class GenreService implements IGenreService {
  private genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  public async findAll(): Promise<Genre[] | Error> {
    const result = await this.genreRepository.findAll();
    return result;
  }
}
