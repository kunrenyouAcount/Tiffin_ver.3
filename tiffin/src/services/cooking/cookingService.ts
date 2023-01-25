import { Cooking } from "../../models/cooking";
import { ICookingRepository } from "../../repositories/cooking/interface";
import { ICookingService } from "./interface";

export class CookingService implements ICookingService {
  private cookingRepository: ICookingRepository;

  constructor(cookingRepository: ICookingRepository) {
    this.cookingRepository = cookingRepository;
  }
  public async getByGenre(genreId: number): Promise<Error | Cooking[]> {
    const result = await this.cookingRepository.getByGenre(genreId);
    return result;
  }

  public async findAll(): Promise<Cooking[] | Error> {
    const result = await this.cookingRepository.findAll();
    return result;
  }
}
