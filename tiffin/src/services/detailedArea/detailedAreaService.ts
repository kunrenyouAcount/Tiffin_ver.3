import { DetailedArea } from "../../models/detailedArea";
import { IDetailedAreaRepository } from "../../repositories/detailedArea/interface";
import { IDetailedAreaService } from "./interface";

export class DetailedAreaService implements IDetailedAreaService {
  private detailedDetailedAreaRepository: IDetailedAreaRepository;

  constructor(detailedDetailedAreaRepository: IDetailedAreaRepository) {
    this.detailedDetailedAreaRepository = detailedDetailedAreaRepository;
  }

  public async findAll(): Promise<DetailedArea[] | Error> {
    const result = await this.detailedDetailedAreaRepository.findAll();
    return result;
  }

  public async getByAreaId(areaId: number): Promise<DetailedArea[] | Error> {
    const result = await this.detailedDetailedAreaRepository.getByAreaId(areaId);
    return result;
  }
}
