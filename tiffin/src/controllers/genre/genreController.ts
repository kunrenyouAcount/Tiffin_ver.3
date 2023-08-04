import { IGenreService } from "../../services/genre/interface";
import { Request, Response, Router } from "express";
import { GenreGetResponse } from "../../models/api/genre/get/response";
import { authorization } from "../middlewares/auth";

export class GenreController {
  private genreService: IGenreService;
  public router: Router;

  constructor(genreService: IGenreService) {
    this.genreService = genreService;
    this.router = Router();

    this.router.get("/genres", authorization, async (req: Request, res: Response) => {
      const results = await this.genreService.findAll();

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
