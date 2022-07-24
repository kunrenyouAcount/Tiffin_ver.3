import { MasterPrefecture } from "../../models/masterPrefecture";
import { IMasterPrefectureRepository } from "../../repositories/masterPrefecture/interface";
import { IMasterPrefectureService } from "./interface";

export class MasterPrefectureService implements IMasterPrefectureService {
  private masterPrefectureRepository: IMasterPrefectureRepository;

  constructor(masterPrefectureRepository: IMasterPrefectureRepository) {
    this.masterPrefectureRepository = masterPrefectureRepository;
  }

  public async findAll(): Promise<MasterPrefecture[] | Error> {
    const result = await this.masterPrefectureRepository.findAll();
    return result;
  }

  public async getById(id: number): Promise<MasterPrefecture | Error> {
    const result = await this.masterPrefectureRepository.getById(id);
    return result;
  }
}
