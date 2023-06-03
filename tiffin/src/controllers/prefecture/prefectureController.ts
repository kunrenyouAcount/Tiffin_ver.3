import { IPrefectureService } from "../../services/prefecture/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { PrefectureGetResponse } from "../../models/api/prefecture/get/response";

export class PrefectureController {
  private prefectureService: IPrefectureService;
  public router: Router;

  constructor(prefectureService: IPrefectureService) {
    this.prefectureService = prefectureService;
    this.router = Router();

    this.router.get("/prefectures", async (req: Request, res: Response) => {
      const results = await this.prefectureService.findAll();

      const prefectureList: PrefectureGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as PrefectureGetResponse;
      });

      res.status(200).json(prefectureList);
    });

    this.router.get("/prefectures/:id", async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const result = await this.prefectureService.getById(id);

      if (result === null) {
        res.status(404).json();
        return;
      }

      const prefecture: PrefectureGetResponse = {
        id: result.id,
        name: result.name,
      } as PrefectureGetResponse;

      res.status(200).json(prefecture);
    });
  }
}
