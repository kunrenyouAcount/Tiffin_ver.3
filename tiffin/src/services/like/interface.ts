export interface ILikeService {
  addLikeShopPhoto(shopPhotoId: number, userId: number): Promise<void>;
  deleteLikeShopPhoto(shopPhotoId: number, userId: number): Promise<void>;
}
