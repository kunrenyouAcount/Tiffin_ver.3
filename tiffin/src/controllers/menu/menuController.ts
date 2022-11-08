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

    this.router.get("/menus/genre-id/:genreId", async (req: Request, res: Response) => {
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

    this.router.get("/menus/cooking-id/:cookingId", async (req: Request, res: Response) => {
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

    this.router.get("/menus/station-id/:stationId", async (req: Request, res: Response) => {
      const stationId = parseInt(req.params.stationId);
      const results = await this.menuService.getByStation(stationId);

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

    this.router.get("/menus/area-id/:areaId", async (req: Request, res: Response) => {
      const areaId = parseInt(req.params.areaId);
      const results = await this.menuService.getByArea(areaId);

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

    this.router.get("/menus/detailed-area-id/:detailedAreaId", async (req: Request, res: Response) => {
      const detailedAreaId = parseInt(req.params.detailedAreaId);
      const results = await this.menuService.getByDetailedArea(detailedAreaId);

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
