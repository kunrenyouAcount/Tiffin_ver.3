import { PrismaClient } from "@prisma/client";
import { ILikeService } from "./interface";

export class LikeService implements ILikeService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async addLikeShopPhoto(shopPhotoId: number, userId: number): Promise<void> {
    await this.prisma.shopPhotoLike.create({
      data: {
        shopPhotoId: shopPhotoId,
        userId: userId,
      },
    });
  }

  public async deleteLikeShopPhoto(shopPhotoId: number, userId: number): Promise<void> {
    await this.prisma.shopPhotoLike.deleteMany({
      where: {
        shopPhotoId: shopPhotoId,
        userId: userId,
      },
    });
  }
}
