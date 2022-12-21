import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";
import { Photo } from "../../models/photo";

export interface IPhotoRepository {
  findAll(): Promise<Photo[] | Error>;
  getById(id: number): Promise<Photo | Error>;
  getByMenuId(menuId: number): Promise<Photo | Error>;
  getByMenuIds(menuIds: number[]): Promise<Photo[] | Error>;
  choiceSearch(params: PhotoChoiceSearchRequest): Promise<Photo[] | Error>;
}
