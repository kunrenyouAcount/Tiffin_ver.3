import { Menu } from "../../models/menu";

export interface IMenuRepository {
  getByGenre(genreId: number): Promise<Menu[] | Error>;
  getByCooking(cookingId: number): Promise<Menu[] | Error>;
  getByStation(stationId: number): Promise<Menu[] | Error>;
}
