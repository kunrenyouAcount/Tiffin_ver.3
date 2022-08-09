import { IPrefectureService } from "../../services/prefecture/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { authorization } from "../../middlewares/auth";

export class PrefectureController {
  private prefectureService: IPrefectureService;
  public router: Router;

  constructor(prefectureService: IPrefectureService) {
    this.prefectureService = prefectureService;
    this.router = Router();

    this.router.get("/prefectures", authorization, async (req: Request, res: Response) => {
      const result = await this.prefectureService.findAll();
      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });

    this.router.get("/prefectures/:id", authorization, async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.prefectureService.getById(id);

      if (result instanceof NotFoundDataError) {
        res.status(404).json(result.message);
        return;
      }

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      res.status(200).json(result);
    });
  }
}
