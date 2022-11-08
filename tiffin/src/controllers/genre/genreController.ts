import { IGenreService } from "../../services/genre/interface";
import { Request, Response, Router } from "express";
import { NotFoundDataError } from "../../utils/error";

export class GenreController {
  private genreService: IGenreService;
  public router: Router;

  constructor(genreService: IGenreService) {
    this.genreService = genreService;
    this.router = Router();

    this.router.get("/genres", async (req: Request, res: Response) => {
      const result = await this.genreService.findAll();
      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }
      res.status(200).json(result);
    });
  }
}
