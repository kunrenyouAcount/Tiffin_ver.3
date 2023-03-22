import { MasterRailroadStation, Menu, PrismaClient, Shop, ShopPhoto } from "@prisma/client";
import { IModalService } from "./interface";

export class ModalService implements IModalService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getModalItemByMenuId(menuId: number): Promise<
    | (Menu & {
        ShopPhoto: ShopPhoto[];
        shop: Shop & { Menu: (Menu & { ShopPhoto: ShopPhoto[] })[]; masterRailroadStation: MasterRailroadStation };
      })
    | null
  > {
    return await this.prisma.menu.findFirst({
      include: {
        ShopPhoto: true,
        shop: {
          include: {
            Menu: {
              include: {
                ShopPhoto: true,
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
