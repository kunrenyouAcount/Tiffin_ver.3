import { DetailedArea } from "../../models/detailedArea";

export interface IDetailedAreaService {
  findAll(): Promise<DetailedArea[] | Error>;
  getByAreaId(areaId: number): Promise<DetailedArea[] | Error>;
}
