import { DetailedArea } from "../../models/detailedArea";
import { IDetailedAreaRepository } from "../../repositories/detailedArea/interface";
import { IDetailedAreaService } from "./interface";

export class DetailedAreaService implements IDetailedAreaService {
  private detailedAreaRepository: IDetailedAreaRepository;

  constructor(detailedAreaRepository: IDetailedAreaRepository) {
    this.detailedAreaRepository = detailedAreaRepository;
  }

  public async findAll(): Promise<DetailedArea[] | Error> {
    const result = await this.detailedAreaRepository.findAll();
    return result;
  }

  public async getByAreaId(areaId: number): Promise<DetailedArea[] | Error> {
    const result = await this.detailedAreaRepository.getByAreaId(areaId);
    return result;
  }
}
