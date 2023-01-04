import { Area } from "../../models/area";

export interface IAreaRepository {
  findAll(): Promise<Area[] | Error>;
  getByPrefectureId(prefectureId: number): Promise<Area[] | Error>;
  searchByKeyword(keyword: string): Promise<Area[] | Error>;
}
