import { MasterArea } from "@prisma/client";

export interface IAreaService {
  findAll(): Promise<MasterArea[]>;
  getByPrefectureId(prefectureId: number): Promise<MasterArea[]>;
}
