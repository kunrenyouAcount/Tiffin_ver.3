import { MasterRailroadStation } from "@prisma/client";

export interface IRailroadStationService {
  findAll(): Promise<MasterRailroadStation[]>;
  getByPrefectureId(prefectureId: number): Promise<MasterRailroadStation[]>;
}
