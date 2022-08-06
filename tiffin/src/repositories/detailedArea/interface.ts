import { DetailedArea } from "../../models/detailedArea";

export interface IDetailedAreaRepository {
  findAll(): Promise<DetailedArea[] | Error>;
  getByAreaId(areaId: number): Promise<DetailedArea[] | Error>;
}
