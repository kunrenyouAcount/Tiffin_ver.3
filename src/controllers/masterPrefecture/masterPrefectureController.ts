import { IMasterPrefectureService } from "../../services/masterPrefecture/interface";
import { Request, Response, Router } from "express";

export class MasterPrefectureController {
  private masterPrefectureService: IMasterPrefectureService;
  public router: Router;

  constructor(masterPrefectureService: IMasterPrefectureService) {
    this.masterPrefectureService = masterPrefectureService;
    this.router = Router();

    this.router.get("/master-prefectures", async (req: Request, res: Response) => {
      const result = await this.masterPrefectureService.findAll();
      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });
  }
}
