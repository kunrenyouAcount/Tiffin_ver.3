import { IPhotoService } from "../../services/photo/interface";
import { Request, Response, Router } from "express";
import { ValidationError } from "../../utils/error";
import { PhotoGetResponse } from "../../models/api/photo/get/response";
import { PhotoSearchRequest } from "../../models/api/photo/search/request";
import { PhotoSearchRequestValidation } from "./search/requestValidation";

export class PhotoController {
  private photoService: IPhotoService;
  public router: Router;

  constructor(photoService: IPhotoService) {
    this.photoService = photoService;
    this.router = Router();

    this.router.get("/photos", async (request: Request, res: Response) => {
      const results = await this.photoService.findAll();

      const photoList: PhotoGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          path: result.path,
          menu_id: result.menuId,
        } as PhotoGetResponse;
      });
      res.status(200).json(photoList);
    });

    this.router.get("/photos/:id", async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.photoService.getById(id);

      if (result === null) {
        res.status(404).json();
        return;
      }

      const photo: PhotoGetResponse = {
        id: result.id,
        path: result.path,
        menu_id: result.menuId,
      } as PhotoGetResponse;
      res.status(200).json(photo);
    });

    this.router.post("/photos/search", async (req: Request, res: Response) => {
      const validation = new PhotoSearchRequestValidation();
      const validated: PhotoSearchRequest | ValidationError = validation.validate(req.body);
      if (validated instanceof ValidationError) {
        res.status(422).json(validated.err);
        return;
      }

      const results = await this.photoService.search(
        validated.master_prefecture_id,
        validated.master_area_id,
        validated.master_detailed_area_id,
        validated.master_railroad_station_id,
        validated.master_genre_id,
        validated.master_cooking_id,
        validated.price_min,
        validated.price_max
      );

      res.status(200).json(results);
    });
  }
}
