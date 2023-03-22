import { MasterRailroadStation, Menu, Shop, ShopPhoto } from "@prisma/client";

export interface IModalService {
  getModalItemByMenuId(
    menuId: number
  ): Promise<
    | (Menu & {
        ShopPhoto: ShopPhoto[];
        shop: Shop & { Menu: (Menu & { ShopPhoto: ShopPhoto[] })[]; masterRailroadStation: MasterRailroadStation };
      })
    | null
  >;
}
