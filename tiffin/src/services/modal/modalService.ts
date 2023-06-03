import { MasterRailroadStation, Menu, PrismaClient, Shop, ShopPhoto } from "@prisma/client";
import { IModalService } from "./interface";

export class ModalService implements IModalService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getModalItemByMenuId(menuId: number): Promise<
    | (Menu & {
        shopPhotos: ShopPhoto[];
        shop: Shop & { menus: (Menu & { shopPhotos: ShopPhoto[] })[]; masterRailroadStation: MasterRailroadStation };
      })
    | null
  > {
    return await this.prisma.menu.findFirst({
      include: {
        shopPhotos: true,
        shop: {
          include: {
            menus: {
              include: {
                shopPhotos: true,
              },
              where: {
                NOT: {
                  id: menuId,
                },
              },
            },
            masterRailroadStation: true,
          },
        },
      },
      where: { id: menuId },
    });
  }
}
