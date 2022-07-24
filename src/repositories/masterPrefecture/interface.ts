import { MasterPrefecture } from "../../models/masterPrefecture";

export interface IMasterPrefectureRepository {
  findAll(): Promise<MasterPrefecture[] | Error>;
  getById(id: number): Promise<MasterPrefecture | Error>;
}
