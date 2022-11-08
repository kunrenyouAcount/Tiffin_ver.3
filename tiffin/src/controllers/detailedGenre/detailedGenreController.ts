import { IDetailedGenreService } from "../../services/detailedGenre/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";
import { DetailedGenreResponse } from "./response";

export class DetailedGenreController {
  private detailedGenreService: IDetailedGenreService;
  public router: Router;

  constructor(detailedGenreService: IDetailedGenreService) {
    this.detailedGenreService = detailedGenreService;
    this.router = Router();

    this.router.get("/detailed-genres/genre-id/:genreId", async (req: Request, res: Response) => {
      const genreId = parseInt(req.params.genreId);
      const results = await this.detailedGenreService.getByGenreId(genreId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const detailedGenreList: DetailedGenreResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as DetailedGenreResponse;
      });
      res.status(200).json(detailedGenreList);
    });
  }
}
