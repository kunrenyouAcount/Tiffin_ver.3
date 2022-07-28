import { Area } from "../../models/area";

export interface IAreaService {
  findAll(): Promise<Area[] | Error>;
  getByPrefectureId(prefectureId: number): Promise<Area[] | Error>;
}
