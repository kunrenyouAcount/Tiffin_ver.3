import { MasterDetailedArea } from "@prisma/client";

export interface IDetailedAreaService {
  findAll(): Promise<MasterDetailedArea[]>;
  getByAreaId(areaId: number): Promise<MasterDetailedArea[]>;
}
