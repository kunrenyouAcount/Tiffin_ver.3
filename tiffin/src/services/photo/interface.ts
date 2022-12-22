import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";
import { Photo } from "../../models/photo";

export interface IPhotoService {
  findAll(): Promise<Photo[] | Error>;
  getById(id: number): Promise<Photo | Error>;
  choiceSearch(params: PhotoChoiceSearchRequest): Promise<Photo[] | Error>;
}
