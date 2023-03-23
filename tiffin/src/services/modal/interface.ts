import { MasterRailroadStation, Menu, Shop, ShopPhoto } from "@prisma/client";

export interface IModalService {
  getModalItemByMenuId(menuId: number): Promise<
    | (Menu & {
        shopPhotos: ShopPhoto[];
        shop: Shop & { menus: (Menu & { shopPhotos: ShopPhoto[] })[]; masterRailroadStation: MasterRailroadStation };
      })
    | null
  >;
}
