import { RailroadStation } from "../../models/railroadStation";

export interface IRailroadStationService {
  findAll(): Promise<RailroadStation[] | Error>;
  getByPrefectureId(prefectureId: number): Promise<RailroadStation[] | Error>;
}
