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
  }
}
