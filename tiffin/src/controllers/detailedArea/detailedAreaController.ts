import { IDetailedAreaService } from "../../services/detailedArea/interface";
import { Request, Response, Router } from "express";
import { DetailedAreaGetResponse } from "../../models/api/detailedArea/get/response";
import { authorization } from "../middlewares/auth";

export class DetailedAreaController {
  private detailedAreaService: IDetailedAreaService;
  public router: Router;

  constructor(detailedAreaService: IDetailedAreaService) {
    this.detailedAreaService = detailedAreaService;
    this.router = Router();

    this.router.get("/detailed-areas", authorization, async (req: Request, res: Response) => {
      const results = await this.detailedAreaService.findAll();

      const detailedAreaList: DetailedAreaGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedAreaGetResponse;
      });
      res.status(200).json(detailedAreaList);
    });

    this.router.get("/detailed-areas/area-id/:areaId", authorization, async (req: Request, res: Response) => {
      const areaId = parseInt(req.params.areaId);
      const results = await this.detailedAreaService.getByAreaId(areaId);

      if (!results.length) {
        res.status(404).json();
        return;
      }

      const detailedAreaList: DetailedAreaGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedAreaGetResponse;
      });
      res.status(200).json(detailedAreaList);
    });
  }
}
