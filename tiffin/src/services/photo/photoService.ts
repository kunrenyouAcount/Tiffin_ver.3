import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";
import { Photo } from "../../models/photo";
import { IShopPhotoRepository } from "../../repositories/shopPhoto/interface";
import { IPhotoService } from "./interface";

export class PhotoService implements IPhotoService {
  private shopPhotoRepository: IShopPhotoRepository;

  constructor(shopPhotoRepository: IShopPhotoRepository) {
    this.shopPhotoRepository = shopPhotoRepository;
  }

  public async findAll(): Promise<Photo[] | Error> {
    const results = await this.shopPhotoRepository.findAll();
    if (results instanceof Error) {
      return results;
    }
    const convertResults = results.map((result) => {
      return {
        id: result.id,
        path: result.path,
        menu_id: result.menu_id,
      } as Photo;
    });
    return convertResults;
  }

  public async getById(id: number): Promise<Photo | Error> {
    const result = await this.shopPhotoRepository.getById(id);
    if (result instanceof Error) {
      return result;
    }

    return {
      id: result.id,
      path: result.path,
      menu_id: result.menu_id,
    } as Photo;
  }

  public async choiceSearch(params: PhotoChoiceSearchRequest): Promise<Error | Photo[]> {
    const results = await this.shopPhotoRepository.choiceSearch(params);
    if (results instanceof Error) {
      return results;
    }
    const convertResults = results.map((result) => {
      return {
        id: result.id,
        path: result.path,
        menu_id: result.menu_id,
      } as Photo;
    });
    return convertResults;
  }
}
