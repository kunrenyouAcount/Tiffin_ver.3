import { IAreaService } from "../../services/area/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";

export class AreaController {
  private areaService: IAreaService;
  public router: Router;

  constructor(areaService: IAreaService) {
    this.areaService = areaService;
    this.router = Router();

    this.router.get("/areas", async (req: Request, res: Response) => {
      const result = await this.areaService.findAll();
      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });

    this.router.get("/areas/:prefectureId", async (req: Request, res: Response) => {
      const prefectureId = parseInt(req.params.prefectureId);
      const result = await this.areaService.getByPrefectureId(prefectureId);

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
