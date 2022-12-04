import { IPhotoService } from "../../services/photo/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";
import { PhotoGetResponse } from "../../models/api/photo/get/response";
import { PhotoChoiceSearchResponse } from "../../models/api/photo/choiceSearch/response";

export class PhotoController {
  private photoService: IPhotoService;
  public router: Router;

  constructor(photoService: IPhotoService) {
    this.photoService = photoService;
    this.router = Router();

    this.router.get("/photos", async (req: Request, res: Response) => {
      const results = await this.photoService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const photoList: PhotoGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          path: result.path,
          menu_id: result.menu_id,
        } as PhotoGetResponse;
      });
      res.status(200).json(photoList);
    });

    this.router.get("/photos/:id", async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.photoService.getById(id);

      if (result instanceof NotFoundDataError) {
        res.status(404).json(result.message);
        return;
      }

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      const photo: PhotoGetResponse = {
        id: result.id,
        path: result.path,
        menu_id: result.menu_id,
      } as PhotoGetResponse;
      res.status(200).json(photo);
    });

    this.router.post("/photos/choice-search", async (req: Request, res: Response) => {
      const params: PhotoChoiceSearchRequest = req.body;
      const results = await this.photoService.choiceSearch(params);
      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const photoList: PhotoChoiceSearchResponse[] = results.map((result) => {
        return {
          id: result.id,
          path: result.path,
          menu_id: result.menu_id,
        } as PhotoChoiceSearchResponse;
      });
      res.status(200).json(photoList);
    });
  }
}
