import { Area } from "../../models/area";
import { DetailedArea } from "../../models/detailedArea";
import { Prefecture } from "../../models/prefecture";
import { RailroadStation } from "../../models/railroadStation";
import { IAreaRepository } from "../../repositories/area/interface";
import { IDetailedAreaRepository } from "../../repositories/detailedArea/interface";
import { IPrefectureRepository } from "../../repositories/prefecture/interface";
import { IRailroadStationRepository } from "../../repositories/railroadStation/interface";
import { IPlaceService } from "./interface";

export class PlaceService implements IPlaceService {
  private prefectureRepository: IPrefectureRepository;
  private areaRepository: IAreaRepository;
  private detailedAreaRepository: IDetailedAreaRepository;
  private railroadStationRepository: IRailroadStationRepository;

  constructor(
    prefectureRepository: IPrefectureRepository,
    areaRepository: IAreaRepository,
    detailedAreaRepository: IDetailedAreaRepository,
    railroadStationRepository: IRailroadStationRepository
  ) {
    this.prefectureRepository = prefectureRepository;
    this.areaRepository = areaRepository;
    this.detailedAreaRepository = detailedAreaRepository;
    this.railroadStationRepository = railroadStationRepository;
  }

  public async searchByKeyword(keyword: string): Promise<
    | Error
    | {
        prefectureMaster: Prefecture[];
        prefectures: Prefecture[];
        areas: Area[];
        detailedAreas: DetailedArea[];
        stations: RailroadStation[];
      }
  > {
    const prefectureResult = await this.prefectureRepository.searchByKeyword(keyword);
    if (prefectureResult instanceof Error) {
      return prefectureResult;
    }
    const prefectureMaster = await this.prefectureRepository.findAll();
    if (prefectureMaster instanceof Error) {
      return prefectureMaster;
    }
    const areaResult = await this.areaRepository.searchByKeyword(keyword);
    if (areaResult instanceof Error) {
      return areaResult;
    }
    const detailedAreaResult = await this.detailedAreaRepository.searchByKeyword(keyword);
    if (detailedAreaResult instanceof Error) {
      return detailedAreaResult;
    }
    const stationResult = await this.railroadStationRepository.searchByKeyword(keyword);
    if (stationResult instanceof Error) {
      return stationResult;
    }
    return {
      prefectureMaster: prefectureMaster,
      prefectures: prefectureResult,
      areas: areaResult,
      detailedAreas: detailedAreaResult,
      stations: stationResult,
    };
  }
}
