import { Prefecture } from "../../models/prefecture";
import { IPrefectureRepository } from "../../repositories/prefecture/interface";
import { IPrefectureService } from "./interface";

export class PrefectureService implements IPrefectureService {
  private prefectureRepository: IPrefectureRepository;

  constructor(prefectureRepository: IPrefectureRepository) {
    this.prefectureRepository = prefectureRepository;
  }

  public async findAll(): Promise<Prefecture[] | Error> {
    const result = await this.prefectureRepository.findAll();
    return result;
  }

  public async getById(id: number): Promise<Prefecture | Error> {
    const result = await this.prefectureRepository.getById(id);
    return result;
  }
}
