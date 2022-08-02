import { RailroadStation } from "../../models/railroadStation";
import { IRailroadStationRepository } from "../../repositories/railroadStation/interface";
import { IRailroadStationService } from "./interface";

export class RailroadStationService implements IRailroadStationService {
  private railroadStationRepository: IRailroadStationRepository;

  constructor(railroadStationRepository: IRailroadStationRepository) {
    this.railroadStationRepository = railroadStationRepository;
  }

  public async findAll(): Promise<RailroadStation[] | Error> {
    const result = await this.railroadStationRepository.findAll();
    return result;
  }

  public async getByPrefectureId(prefectureId: number): Promise<RailroadStation[] | Error> {
    const result = await this.railroadStationRepository.getByPrefectureId(prefectureId);
    return result;
  }
}
