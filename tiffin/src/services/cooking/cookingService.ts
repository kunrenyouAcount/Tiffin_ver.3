import { Cooking } from "../../models/cooking";
import { ICookingRepository } from "../../repositories/cooking/interface";
import { ICookingService } from "./interface";

export class CookingService implements ICookingService {
  private detailedAreaRepository: ICookingRepository;

  constructor(detailedAreaRepository: ICookingRepository) {
    this.detailedAreaRepository = detailedAreaRepository;
  }
  getByGenre(): Promise<Cooking[] | Error> {
    throw new Error("Method not implemented.");
  }
  getByDetailedGenre(): Promise<Cooking[] | Error> {
    throw new Error("Method not implemented.");
  }

  public async findAll(): Promise<Cooking[] | Error> {
    const result = await this.detailedAreaRepository.findAll();
    return result;
  }
}
