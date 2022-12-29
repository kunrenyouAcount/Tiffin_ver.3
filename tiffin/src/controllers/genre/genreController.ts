import { IGenreService } from "../../services/genre/interface";
import { Request, Response, Router } from "express";
import { GenreGetResponse } from "../../models/api/genre/get/response";

export class GenreController {
  private genreService: IGenreService;
  public router: Router;

  constructor(genreService: IGenreService) {
    this.genreService = genreService;
    this.router = Router();

    this.router.get("/genres", async (req: Request, res: Response) => {
      const results = await this.genreService.findAll();
      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const genreList: GenreGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
        } as GenreGetResponse;
      });
      res.status(200).json(genreList);
    });
  }
}
