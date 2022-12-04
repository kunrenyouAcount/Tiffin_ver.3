import { IRailroadStationService } from "../../services/railroadStation/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { RailroadStationGetResponse } from "../../models/api/railroadStation/get/response";

export class RailroadStationController {
  private railroadStationService: IRailroadStationService;
  public router: Router;

  constructor(railroadStationService: IRailroadStationService) {
    this.railroadStationService = railroadStationService;
    this.router = Router();

    this.router.get("/railroad-stations", async (req: Request, res: Response) => {
      const results = await this.railroadStationService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const railroadStationList: RailroadStationGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          post_code: result.post_code,
          address: result.address,
          status: result.status,
        } as RailroadStationGetResponse;
      });
      res.status(200).json(railroadStationList);
    });

    this.router.get("/railroad-stations/prefecture-id/:prefectureId", async (req: Request, res: Response) => {
      const prefectureId = parseInt(req.params.prefectureId);
      const results = await this.railroadStationService.getByPrefectureId(prefectureId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const railroadStationList: RailroadStationGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          post_code: result.post_code,
          address: result.address,
          status: result.status,
        } as RailroadStationGetResponse;
      });
      res.status(200).json(railroadStationList);
    });
  }
}
