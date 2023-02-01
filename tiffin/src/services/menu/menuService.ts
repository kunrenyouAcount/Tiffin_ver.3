import { Menu } from "../../models/menu";
import { Photo } from "../../models/photo";
import { RailroadStation } from "../../models/railroadStation";
import { Shop } from "../../models/shop";
import { IMenuRepository } from "../../repositories/menu/interface";
import { IShopPhotoRepository } from "../../repositories/shopPhoto/interface";
import { IRailroadStationRepository } from "../../repositories/railroadStation/interface";
import { IShopRepository } from "../../repositories/shop/interface";
import { IMenuService } from "./interface";

export class MenuService implements IMenuService {
  private menuRepository: IMenuRepository;
  private shopRepository: IShopRepository;
  private shopPhotoRepository: IShopPhotoRepository;
  private stationRepository: IRailroadStationRepository;

  constructor(
    menuRepository: IMenuRepository,
    shopRepository: IShopRepository,
    shopPhotoRepository: IShopPhotoRepository,
    stationRepository: IRailroadStationRepository
  ) {
    this.menuRepository = menuRepository;
    this.shopRepository = shopRepository;
    this.shopPhotoRepository = shopPhotoRepository;
    this.stationRepository = stationRepository;
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
        station: RailroadStation;
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
    const stationResult = await this.stationRepository.getById(shopResult.master_railroad_station_id);
    if (stationResult instanceof Error) {
      return stationResult;
    }
    const shopPhotoResult = await this.shopPhotoRepository.getByMenuId(menuResult.id!);
    if (shopPhotoResult instanceof Error) {
      return shopPhotoResult;
    }
    const convertPhotoResult = {
      id: shopPhotoResult.id,
      path: shopPhotoResult.path,
      menu_id: shopPhotoResult.menu_id,
    } as Photo;
    const menuResultsByShop = await this.menuRepository.getByShopId(menuResult.shop_id);
    if (menuResultsByShop instanceof Error) {
      return menuResultsByShop;
    }
    //店舗の他のメニューを取得しているため、重複を削除
    const otherMenuResults = menuResultsByShop.filter((menu) => menu.id !== menuId);
    const otherMenuIds = otherMenuResults.map((otherMenu) => otherMenu.id!);
    const otherPhotoResults = await this.shopPhotoRepository.getByMenuIds(otherMenuIds);
    if (otherPhotoResults instanceof Error) {
      return otherPhotoResults;
    }
    const convertOtherPhotoResults = otherPhotoResults.map((result) => {
      return {
        id: result.id,
        path: result.path,
        menu_id: result.menu_id,
      } as Photo;
    });

    return {
      menu: menuResult,
      shop: shopResult,
      station: stationResult,
      photo: convertPhotoResult,
      otherMenus: otherMenuResults,
      otherPhotos: convertOtherPhotoResults,
    };
  }
}
