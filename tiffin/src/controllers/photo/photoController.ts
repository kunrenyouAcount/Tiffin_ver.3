import { IPhotoService } from "../../services/photo/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { PhotoResponse } from "./response";
import { ChoiceSearchRequest } from "./choiceSearchRequest";

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

      const photoList: PhotoResponse[] = results.map((result) => {
        return {
          id: result.id,
          path: result.path,
          menu_id: result.menu_id,
        } as PhotoResponse;
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
      const photo: PhotoResponse = {
        id: result.id,
        path: result.path,
        menu_id: result.menu_id,
      } as PhotoResponse;
      res.status(200).json(photo);
    });

    this.router.post("/photos/choice-search", async (req: Request, res: Response) => {
      const params: ChoiceSearchRequest = req.body;
      const results = await this.photoService.choiceSearch(params);
      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const photoList: PhotoResponse[] = results.map((result) => {
        return {
          id: result.id,
          path: result.path,
          menu_id: result.menu_id,
        } as PhotoResponse;
      });
      res.status(200).json(photoList);
    });
  }
}
