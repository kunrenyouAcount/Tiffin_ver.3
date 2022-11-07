import { ChoiceSearchRequest } from "../../controllers/photo/choiceSearchRequest";
import { Photo } from "../../models/photo";

export interface IPhotoService {
  findAll(): Promise<Photo[] | Error>;
  getById(id: number): Promise<Photo | Error>;
  choiceSearch(params: ChoiceSearchRequest): Promise<Photo[] | Error>;
}
