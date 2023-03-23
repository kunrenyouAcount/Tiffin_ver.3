import { IShopPhotoLikeRepository } from "../../repositories/shopPhotoLike/interface";
import { IShopPhotoLikeService } from "./interface";

export class ShopPhotoLikeService implements IShopPhotoLikeService {
  private shopPhotoLikeRepository: IShopPhotoLikeRepository;
  constructor(shopPhotoLikeRepository: IShopPhotoLikeRepository) {
    this.shopPhotoLikeRepository = shopPhotoLikeRepository;
  }

  public async create(userId: number, shopPhotoId: number): Promise<void | Error> {
    return await this.shopPhotoLikeRepository.create(userId, shopPhotoId);
  }
  public async delete(userId: number, shopPhotoId: number): Promise<void | Error> {
    return await this.shopPhotoLikeRepository.delete(userId, shopPhotoId);
  }
}
