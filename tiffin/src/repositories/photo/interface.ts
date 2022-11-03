import { Photo } from "../../models/photo";

export interface IPhotoRepository {
  findAll(): Promise<Photo[] | Error>;
  getById(id: number): Promise<Photo | Error>;
}
