import { Request, Response, Router } from "express";
import { EatingSearchByKeywordResponse } from "../../models/api/eating/searchKeyword/response";
import { IEatingService } from "../../services/eating/interface";

export class EatingController {
  private eatingService: IEatingService;
  public router: Router;

  constructor(eatingService: IEatingService) {
    this.eatingService = eatingService;
    this.router = Router();

    this.router.get("/eatings/search-keyword/", async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;
      const results = await this.eatingService.searchByKeyword(keyword);

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const eatingResponse = {
        genres: results.genres.map((genre) => {
          return {
            id: genre.id!,
            name: genre.name,
          };
        }),
        detailedGenres: results.detailedGenres.map((detailedGenre) => {
          return {
            id: detailedGenre.id!,
            name: detailedGenre.name,
          };
        }),
        cookings: results.cookings.map((cooking) => {
          return {
            id: cooking.id!,
            name: cooking.name,
          };
        }),
      } as EatingSearchByKeywordResponse;
      res.status(200).json(eatingResponse);
    });
  }
}
