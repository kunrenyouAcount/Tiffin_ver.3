import { ICookingService } from "../../services/cooking/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { CookingResponse } from "./response";

export class CookingController {
  private cookingService: ICookingService;
  public router: Router;

  constructor(cookingService: ICookingService) {
    this.cookingService = cookingService;
    this.router = Router();

    this.router.get("/cookings", async (req: Request, res: Response) => {
      const results = await this.cookingService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const cookingList: CookingResponse[] = results.map((results) => {
        return {
          id: results.id,
          name: results.name,
        } as CookingResponse;
      });
      res.status(200).json(cookingList);
    });

    this.router.get("/cookings/genre/:genreId", async (req: Request, res: Response) => {
      const genreId = parseInt(req.params.genreId);
      const results = await this.cookingService.getByGenre(genreId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const menuList: CookingResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as CookingResponse;
      });
      res.status(200).json(menuList);
    });

    this.router.get("/cookings/detailedGenre/:detailedGenreId", async (req: Request, res: Response) => {
      const detailedGenreId = parseInt(req.params.detailedGenreId);
      const results = await this.cookingService.getByDetailedGenre(detailedGenreId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const menuList: CookingResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as CookingResponse;
      });
      res.status(200).json(menuList);
    });
  }
}
