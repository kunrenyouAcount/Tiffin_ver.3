import { Menu } from "../../models/menu";
import { Photo } from "../../models/photo";
import { Shop } from "../../models/shop";
import { IMenuRepository } from "../../repositories/menu/interface";
import { IPhotoRepository } from "../../repositories/photo/interface";
import { PhotoRepository } from "../../repositories/photo/photoRepository";
import { IShopRepository } from "../../repositories/shop/interface";
import { IMenuService } from "./interface";

export class MenuService implements IMenuService {
  private menuRepository: IMenuRepository;
  private shopRepository: IShopRepository;
  private photoRepository: IPhotoRepository;

  constructor(menuRepository: IMenuRepository, shopRepository: IShopRepository, photoRepository: PhotoRepository) {
    this.menuRepository = menuRepository;
    this.shopRepository = shopRepository;
    this.photoRepository = photoRepository;
  }

  public async getByArea(areaId: number): Promise<Error | Menu[]> {
    const result = await this.menuRepository.getByArea(areaId);
    return result;
  }

  public async getByDetailedArea(detailedAreaId: number): Promise<Menu[] | Error> {
    const result = await this.menuRepository.getByDetailedArea(detailedAreaId);
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

  public async getModalItemByMenuId(menuId: number): Promise<
    | {
        menu: Menu;
        shop: Shop;
        photo: Photo;
        otherMenus: Menu[];
        otherPhotos: Photo[];
      }
    | Error
  > {
    const menuResult = await this.menuRepository.getById(menuId);
    if (menuResult instanceof Error) {
      return menuResult;
    }
    const shopResult = await this.shopRepository.getById(menuResult.shop_id);
    if (shopResult instanceof Error) {
      return shopResult;
    }
    const photoResult = await this.photoRepository.getByMenuId(menuResult.id!);
    if (photoResult instanceof Error) {
      return photoResult;
    }
    const otherMenuResults = await this.menuRepository.getByShopId(menuResult.shop_id);
    if (otherMenuResults instanceof Error) {
      return otherMenuResults;
    }
    const otherMenuIds = otherMenuResults.map((otherMenu) => otherMenu.id!);
    const otherPhotoResults = await this.photoRepository.getByMenuIds(otherMenuIds);
    if (otherPhotoResults instanceof Error) {
      return otherPhotoResults;
    }

    return {
      menu: menuResult,
      shop: shopResult,
      photo: photoResult,
      otherMenus: otherMenuResults,
      otherPhotos: otherPhotoResults,
    };
  }
}
