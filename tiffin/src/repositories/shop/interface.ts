import { Shop } from "../../models/shop";

export interface IShopRepository {
  getById(shopId: number): Promise<Shop | Error>;
}
