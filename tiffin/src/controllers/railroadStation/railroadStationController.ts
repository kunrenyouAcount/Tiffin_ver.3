import { IRailroadStationService } from "../../services/railroadStation/interface";
import { Request, Response, Router } from "express";
import { RailroadStationGetResponse } from "../../models/api/railroadStation/get/response";
import { authorization } from "../middlewares/auth";

export class RailroadStationController {
  private railroadStationService: IRailroadStationService;
  public router: Router;

  constructor(railroadStationService: IRailroadStationService) {
    this.railroadStationService = railroadStationService;
    this.router = Router();

    this.router.get("/railroad-stations", authorization, async (req: Request, res: Response) => {
      const results = await this.railroadStationService.findAll();

      const railroadStationList: RailroadStationGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          post_code: result.postCode,
          address: result.address,
          status: result.status,
        } as RailroadStationGetResponse;
      });
      res.status(200).json(railroadStationList);
    });

    this.router.get(
      "/railroad-stations/prefecture-id/:prefectureId",
      authorization,
      async (req: Request, res: Response) => {
        const prefectureId = parseInt(req.params.prefectureId);
        const results = await this.railroadStationService.getByPrefectureId(prefectureId);

        if (!results.length) {
          res.status(404).json();
          return;
        }

        const railroadStationList: RailroadStationGetResponse[] = results.map((result) => {
          return {
            id: result.id,
            name: result.name,
            post_code: result.postCode,
            address: result.address,
            status: result.status,
          } as RailroadStationGetResponse;
        });
        res.status(200).json(railroadStationList);
      }
    );
  }
}
