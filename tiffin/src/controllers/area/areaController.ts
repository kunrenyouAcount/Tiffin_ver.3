import { IAreaService } from "../../services/area/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { AreaResponse } from "./response";

export class AreaController {
  private areaService: IAreaService;
  public router: Router;

  constructor(areaService: IAreaService) {
    this.areaService = areaService;
    this.router = Router();

    this.router.get("/areas", async (req: Request, res: Response) => {
      const results = await this.areaService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const areaList: AreaResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as AreaResponse;
      });
      res.status(200).json(areaList);
    });

    this.router.get("/areas/prefecture-id/:prefectureId", async (req: Request, res: Response) => {
      const prefectureId = parseInt(req.params.prefectureId);
      const results = await this.areaService.getByPrefectureId(prefectureId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const areaList: AreaResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as AreaResponse;
      });
      res.status(200).json(areaList);
    });
  }
}
