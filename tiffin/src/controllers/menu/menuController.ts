import { Request, Response, Router } from "express";
import { MenuGetResponse } from "../../models/api/menu/get/response";
import { MenuModalItemResponse } from "../../models/api/menu/getModalItem/response";
import { IMenuService } from "../../services/menu/interface";
import { NotFoundDataError } from "../../utils/error";

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

      const menuList: MenuGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuGetResponse;
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

      const menuList: MenuGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuGetResponse;
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

      const menuList: MenuGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuGetResponse;
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

      const menuList: MenuGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuGetResponse;
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

      const menuList: MenuGetResponse[] = results.map((result) => {
        return {
          id: result.id,
          name: result.name,
          price: result.price,
          shop_id: result.shop_id,
        } as MenuGetResponse;
      });
      res.status(200).json(menuList);
    });

    this.router.get("/menus/modal-item/:menuId", async (req: Request, res: Response) => {
      const id = parseInt(req.params.menuId);
      const result = await this.menuService.getModalItemByMenuId(id);

      if (result instanceof NotFoundDataError) {
        res.status(404).json(result.message);
        return;
      }

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      const otherMenus = result.otherMenus.map((menu) => {
        const photo = result.otherPhotos.find((photo) => photo.menu_id === menu.id!);
        return {
          id: menu.id!,
          name: menu.name,
          price: menu.price,
          photo_path: photo === undefined ? "" : photo.path,
        };
      });

      const modalItem: MenuModalItemResponse = {
        id: result.menu.id!,
        name: result.menu.name,
        price: result.menu.price,
        photo_path: result.photo.path,
        shop: {
          id: result.shop.id,
          name: result.shop.name,
          tel: result.shop.tel,
          opening_time: result.shop.opening_time,
          closing_time: result.shop.closing_time,
          station_name: result.station.name,
          address: result.shop.address,
        },
        other_menus: otherMenus,
      } as MenuModalItemResponse;

      res.status(200).json(modalItem);
    });
  }
}
