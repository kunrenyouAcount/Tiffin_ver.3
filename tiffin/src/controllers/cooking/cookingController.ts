import { ICookingService } from "../../services/cooking/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { CookingGetResponse } from "../../models/api/cooking/get/response";
import { authorization } from "../middlewares/auth";

export class CookingController {
  private cookingService: ICookingService;
  public router: Router;

  constructor(cookingService: ICookingService) {
    this.cookingService = cookingService;
    this.router = Router();

    this.router.get("/cookings", authorization, async (req: Request, res: Response) => {
      const results = await this.cookingService.findAll();

      const cookingList: CookingGetResponse[] = results.map((results) => {
        return {
          id: results.id,
          name: results.name,
        } as CookingGetResponse;
      });
      res.status(200).json(cookingList);
    });

    this.router.get("/cookings/genre-id/:genreId", authorization, async (req: Request, res: Response) => {
      const genreId = parseInt(req.params.genreId);
      const results = await this.cookingService.getByGenre(genreId);

      if (!results.length) {
        res.status(404).json();
        return;
      }

      const cookingList: CookingGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as CookingGetResponse;
      });
      res.status(200).json(cookingList);
    });
  }
}
