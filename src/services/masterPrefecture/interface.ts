import { MasterPrefecture } from "../../models/masterPrefecture";

export interface IMasterPrefectureService {
  findAll(): Promise<MasterPrefecture[] | Error>;
  getById(id: number): Promise<MasterPrefecture | Error>;
}
