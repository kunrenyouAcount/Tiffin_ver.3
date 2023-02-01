import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";
import { ShopPhoto } from "../../models/shopPhoto";

export interface IShopPhotoRepository {
  findAll(): Promise<ShopPhoto[] | Error>;
  getById(id: number): Promise<ShopPhoto | Error>;
  getByMenuId(menuId: number): Promise<ShopPhoto | Error>;
  getByMenuIds(menuIds: number[]): Promise<ShopPhoto[] | Error>;
  choiceSearch(params: PhotoChoiceSearchRequest): Promise<ShopPhoto[] | Error>;
}
