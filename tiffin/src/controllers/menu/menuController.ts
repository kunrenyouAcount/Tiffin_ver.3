import { Request, Response, Router } from "express";
import { IMenuService } from "../../services/menu/interface";
import { NotFoundDataError } from "../../utils/error";
import { MenuResponse } from "./response";

export class MenuController {
  private menuService: IMenuService;
  public router: Router;

  constructor(menuService: IMenuService) {
    this.menuService = menuService;
    this.router = Router();

    this.router.get("/menus/genre/:genreId", async (req: Request, res: Response) => {
      const genreId = parseInt(req.params.genreId);
      const results = await this.menuService.getByGenre(genreId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const menuList: MenuResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuResponse;
      });
      res.status(200).json(menuList);
    });

    this.router.get("/menus/cooking/:cookingId", async (req: Request, res: Response) => {
      const cookingId = parseInt(req.params.cookingId);
      const results = await this.menuService.getByCooking(cookingId);

      if (results instanceof NotFoundDataError) {
        res.status(404).json(results.message);
        return;
      }

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const menuList: MenuResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuResponse;
      });
      res.status(200).json(menuList);
    });
  }
}
