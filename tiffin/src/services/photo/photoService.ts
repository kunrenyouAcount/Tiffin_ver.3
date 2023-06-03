import { PrismaClient, ShopPhoto } from "@prisma/client";
import { IPhotoService } from "./interface";

export class PhotoService implements IPhotoService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async findAll(): Promise<ShopPhoto[]> {
    return await this.prisma.shopPhoto.findMany();
  }

  public async getById(id: number): Promise<ShopPhoto | null> {
    return await this.prisma.shopPhoto.findFirst({
      where: { id },
    });
  }

  public async search(
    prefectureId: number | null,
    areaId: number | null,
    detailedAreaId: number | null,
    railroadStationId: number | null,
    genreId: number | null,
    cookingId: number | null,
    minPrice: number | null,
    maxPrice: number | null
  ): Promise<ShopPhoto[]> {
    let shopPhotos = await this.prisma.shopPhoto.findMany({
      include: {
        menu: {
          include: {
            shop: {
              include: {
                masterArea: true,
              },
            },
            masterCooking: {
              include: {
                masterGenreMasterCookings: true,
              },
            },
          },
        },
      },
    });

    if (prefectureId) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.shop.masterArea.masterPrefectureId === prefectureId;
      });
    }
    if (areaId) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.shop.masterAreaId === areaId;
      });
    }
    if (detailedAreaId) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.shop.masterDetailedAreaId === detailedAreaId;
      });
    }
    if (railroadStationId) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.shop.masterRailroadStationId === railroadStationId;
      });
    }
    if (genreId) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.masterCooking.masterGenreMasterCookings.filter((masterGenreMasterCooking) => {
          return masterGenreMasterCooking.masterGenreId === genreId;
        }).length;
      });
    }
    if (cookingId) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.masterCookingId === cookingId;
      });
    }
    if (minPrice) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.price >= minPrice;
      });
    }
    if (maxPrice) {
      shopPhotos = shopPhotos.filter((photo) => {
        return photo.menu.price <= maxPrice;
      });
    }
    return shopPhotos;
  }
}
