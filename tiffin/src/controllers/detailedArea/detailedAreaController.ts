import { IDetailedAreaService } from "../../services/detailedArea/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { DetailedAreaResponse } from "./response";

export class DetailedAreaController {
  private detailedAreaService: IDetailedAreaService;
  public router: Router;

  constructor(detailedAreaService: IDetailedAreaService) {
    this.detailedAreaService = detailedAreaService;
    this.router = Router();

    this.router.get("/detailed-areas", async (req: Request, res: Response) => {
      const results = await this.detailedAreaService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const detailedAreaList: DetailedAreaResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedAreaResponse;
      });
      res.status(200).json(detailedAreaList);
    });

    this.router.get("/detailed-areas/area-id/:areaId", async (req: Request, res: Response) => {
      const areaId = parseInt(req.params.areaId);
      const results = await this.detailedAreaService.getByAreaId(areaId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const detailedAreaList: DetailedAreaResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedAreaResponse;
      });
      res.status(200).json(detailedAreaList);
    });
  }
}
