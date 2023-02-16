export interface IShopPhotoLikeRepository {
  create(userId: number, shopPhotoId: number): Promise<void | Error>;
  delete(userId: number, shopPhotoId: number): Promise<void | Error>;
}
