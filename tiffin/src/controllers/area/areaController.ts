import { IAreaService } from "../../services/area/interface";
import { Request, Response, Router } from "express";
import { AreaGetResponse } from "../../models/api/area/get/response";

export class AreaController {
  private areaService: IAreaService;
  public router: Router;

  constructor(areaService: IAreaService) {
    this.areaService = areaService;
    this.router = Router();

    this.router.get("/areas", async (req: Request, res: Response) => {
      const results = await this.areaService.findAll();

      const areaList: AreaGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          master_prefecture_id: result.masterPrefectureId,
        } as AreaGetResponse;
      });
      res.status(200).json(areaList);
    });

    this.router.get("/areas/prefecture-id/:prefectureId", async (req: Request, res: Response) => {
      const prefectureId = parseInt(req.params.prefectureId);
      const results = await this.areaService.getByPrefectureId(prefectureId);

      if (!results.length) {
        res.status(404).json();
        return;
      }

      const areaList: AreaGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          master_prefecture_id: result.masterPrefectureId,
        } as AreaGetResponse;
      });
      res.status(200).json(areaList);
    });
  }
}
