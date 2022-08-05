import { RailroadStation } from "../../models/railroadStation";

export interface IRailroadStationRepository {
  findAll(): Promise<RailroadStation[] | Error>;
  getByPrefectureId(prefectureId: number): Promise<RailroadStation[] | Error>;
}
