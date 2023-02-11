import { Request, Response, Router } from "express";
import { authorization } from "../../middlewares/auth";
import { IShopPhotoLikeService } from "../../services/shopPhotoLike/interface";

export class ShopPhotoLikeController {
  private shopPhotoLikeService: IShopPhotoLikeService;
  public router: Router;

  constructor(shopPhotoLikeService: IShopPhotoLikeService) {
    this.shopPhotoLikeService = shopPhotoLikeService;
    this.router = Router();

    this.router.put("/shop-photo-likes/:shop_photo_id", authorization, async (req: Request, res: Response) => {
      const userId = req.body.payload.userId;
      const shopPhotoId = parseInt(req.params.shop_photo_id);
      const result = await this.shopPhotoLikeService.create(userId, shopPhotoId);
      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      res.status(201).json();
    });

    this.router.delete("/shop-photo-likes/:shop_photo_id", authorization, async (req: Request, res: Response) => {
      const userId = req.body.payload.userId;
      const shopPhotoId = parseInt(req.params.shop_photo_id);
      const result = await this.shopPhotoLikeService.delete(userId, shopPhotoId);

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      res.status(200).json();
    });
  }
}
