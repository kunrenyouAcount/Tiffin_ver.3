import { Area } from "../../models/area";
import { IAreaRepository } from "../../repositories/area/interface";
import { IAreaService } from "./interface";

export class AreaService implements IAreaService {
  private areaRepository: IAreaRepository;

  constructor(areaRepository: IAreaRepository) {
    this.areaRepository = areaRepository;
  }

  public async findAll(): Promise<Area[] | Error> {
    const result = await this.areaRepository.findAll();
    return result;
  }

  public async getByPrefectureId(prefectureId: number): Promise<Area[] | Error> {
    const result = await this.areaRepository.getByPrefectureId(prefectureId);
    return result;
  }
}
