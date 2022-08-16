import { IDetailedAreaService } from "../../services/detailedArea/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { DetailedAreaResponse } from "./response";
import { authorization } from "../../middlewares/auth";

export class DetailedAreaController {
  private detailedDetailedAreaService: IDetailedAreaService;
  public router: Router;

  constructor(detailedDetailedAreaService: IDetailedAreaService) {
    this.detailedDetailedAreaService = detailedDetailedAreaService;
    this.router = Router();

    this.router.get("/detailed-areas", authorization, async (req: Request, res: Response) => {
      const results = await this.detailedDetailedAreaService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const detailedDetailedAreaList: DetailedAreaResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedAreaResponse;
      });
      res.status(200).json(detailedDetailedAreaList);
    });

    this.router.get("/detailed-areas/area-id/:areaId", authorization, async (req: Request, res: Response) => {
      const areaId = parseInt(req.params.areaId);
      const results = await this.detailedDetailedAreaService.getByAreaId(areaId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const detailedDetailedAreaList: DetailedAreaResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedAreaResponse;
      });
      res.status(200).json(detailedDetailedAreaList);
    });
  }
}
