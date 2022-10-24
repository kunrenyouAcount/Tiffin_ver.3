import { Menu } from "../../models/menu";

export interface IMenuService {
  getByGenre(genreId: number): Promise<Menu[] | Error>;
  getByCooking(cookingId: number): Promise<Menu[] | Error>;
  getByStation(stationId: number): Promise<Menu[] | Error>;
  getByArea(areaId: number): Promise<Menu[] | Error>;
  getByDetailedArea(detailedAreaId: number): Promise<Menu[] | Error>;
}
