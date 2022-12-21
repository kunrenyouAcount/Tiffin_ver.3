import { Menu } from "../../models/menu";
import { Photo } from "../../models/photo";
import { Shop } from "../../models/shop";

export interface IMenuService {
  getByGenre(genreId: number): Promise<Menu[] | Error>;
  getByCooking(cookingId: number): Promise<Menu[] | Error>;
  getByStation(stationId: number): Promise<Menu[] | Error>;
  getByArea(areaId: number): Promise<Menu[] | Error>;
  getByDetailedArea(detailedAreaId: number): Promise<Menu[] | Error>;
  getModalItemByMenuId(menuId: number): Promise<
    | {
        menu: Menu;
        shop: Shop;
        photo: Photo;
        otherMenus: Menu[];
        otherPhotos: Photo[];
      }
    | Error
  >;
}
