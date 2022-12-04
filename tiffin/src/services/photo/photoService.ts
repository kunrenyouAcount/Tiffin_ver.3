import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";
import { Photo } from "../../models/photo";
import { IPhotoRepository } from "../../repositories/photo/interface";
import { IPhotoService } from "./interface";

export class PhotoService implements IPhotoService {
  private photoRepository: IPhotoRepository;

  constructor(photoRepository: IPhotoRepository) {
    this.photoRepository = photoRepository;
  }

  public async findAll(): Promise<Photo[] | Error> {
    const result = await this.photoRepository.findAll();
    return result;
  }

  public async getById(id: number): Promise<Photo | Error> {
    const result = await this.photoRepository.getById(id);
    return result;
  }

  public async choiceSearch(params: PhotoChoiceSearchRequest): Promise<Error | Photo[]> {
    const result = await this.photoRepository.choiceSearch(params);
    return result;
  }
}
