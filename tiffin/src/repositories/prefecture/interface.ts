import { Prefecture } from "../../models/prefecture";

export interface IPrefectureRepository {
  findAll(): Promise<Prefecture[] | Error>;
  getById(id: number): Promise<Prefecture | Error>;
}
