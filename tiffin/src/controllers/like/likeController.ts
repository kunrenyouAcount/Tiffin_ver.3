import { ValidationError } from "../../utils/error";
import { Request, Response, Router } from "express";
import { LikeAddShopPhotoRequest } from "../../models/api/like/add/request";
import { ILikeService } from "../../services/like/interface";
import { authorization } from "../middlewares/auth";
import { LikeAddRequestValidation } from "./add/requestValidation";

export class LikeController {
  private likeService: ILikeService;
  public router: Router;

  constructor(likeService: ILikeService) {
    this.likeService = likeService;
    this.router = Router();

    this.router.post("/like/shop-photo/", authorization, async (req: Request, res: Response) => {
      const validation = new LikeAddRequestValidation();
      const validated: LikeAddShopPhotoRequest | ValidationError = validation.validate(req.body);
      if (validated instanceof ValidationError) {
        res.status(422).json(validated.err);
        return;
      }
      const shopPhotoId = validated.shop_photo_id as number;
      const userId = req.body.payload.userId as number;

      await this.likeService.addLikeShopPhoto(shopPhotoId, userId);
      res.status(200).json(shopPhotoId);
    });

    this.router.delete("/like/shop-photo", authorization, async (req: Request, res: Response) => {
      const shopPhotoId = req.query.shop_photo_id as string;
      const parsedShopPhotoId = parseInt(shopPhotoId);
      const userId = req.body.payload.userId as number;

      await this.likeService.deleteLikeShopPhoto(parsedShopPhotoId, userId);
      res.status(200).json(shopPhotoId);
    });
  }
}
