import { Menu } from "../../models/menu";
import { IMenuRepository } from "../../repositories/menu/interface";
import { IMenuService } from "./interface";

export class MenuService implements IMenuService {
  private menuRepository: IMenuRepository;

  constructor(menuRepository: IMenuRepository) {
    this.menuRepository = menuRepository;
  }

  public async getByArea(areaId: number): Promise<Error | Menu[]> {
    const result = await this.menuRepository.getByArea(areaId);
    return result;
  }

  public async getByGenre(genreId: number): Promise<Error | Menu[]> {
    const result = await this.menuRepository.getByGenre(genreId);
    return result;
  }

  public async getByCooking(cookingId: number): Promise<Error | Menu[]> {
    const result = await this.menuRepository.getByCooking(cookingId);
    return result;
  }

  public async getByStation(stationId: number): Promise<Error | Menu[]> {
    const result = await this.menuRepository.getByStation(stationId);
    return result;
  }
}
