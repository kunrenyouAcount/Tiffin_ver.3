import { Prefecture } from "../../models/prefecture";

export interface IPrefectureService {
  findAll(): Promise<Prefecture[] | Error>;
  getById(id: number): Promise<Prefecture | Error>;
}
