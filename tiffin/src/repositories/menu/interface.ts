import { Menu } from "../../models/menu";

export interface IMenuRepository {
  getByGenre(genreId: number): Promise<Menu[] | Error>;
  getByCooking(cookingId: number): Promise<Menu[] | Error>;
  getByStation(stationId: number): Promise<Menu[] | Error>;
  getByArea(areaId: number): Promise<Menu[] | Error>;
  getByDetailedArea(detailedAreaId: number): Promise<Menu[] | Error>;
  getById(menuId: number): Promise<Menu | Error>;
  getByShopId(shopId: number): Promise<Menu[] | Error>;
}
