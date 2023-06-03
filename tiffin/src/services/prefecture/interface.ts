import { MasterPrefecture } from "@prisma/client";

export interface IPrefectureService {
  findAll(): Promise<MasterPrefecture[]>;
  getById(id: number): Promise<MasterPrefecture | null>;
}
