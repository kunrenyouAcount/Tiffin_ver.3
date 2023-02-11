export interface IShopPhotoLikeService {
  create(userId: number, shopPhotoId: number): Promise<void | Error>;
  delete(userId: number, shopPhotoId: number): Promise<void | Error>;
}
