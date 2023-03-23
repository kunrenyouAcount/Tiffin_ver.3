import { Request, Response, Router } from "express";
import { GetModalItemResponse } from "../../models/api/modal/getModalItem/response";
import { IModalService } from "../../services/modal/interface";

export class ModalController {
  private modalService: IModalService;
  public router: Router;

  constructor(modalService: IModalService) {
    this.modalService = modalService;
    this.router = Router();

    this.router.get("/modal/menu-id/:menuId", async (req: Request, res: Response) => {
      const id = parseInt(req.params.menuId);
      const result = await this.modalService.getModalItemByMenuId(id);

      if (result === null) {
        res.status(404).json();
        return;
      }

      const modalItem = {
        id: result.id,
        name: result.name,
        price: result.price,
        shopPhoto: result.shopPhotos.map((photo) => {
          return {
            id: photo.id,
            path: photo.path,
          };
        }),
        shop: {
          id: result.shop.id,
          name: result.shop.name,
          address: result.shop.address,
          tel: result.shop.tel,
          opening_time: result.shop.openingTime,
          closing_time: result.shop.closingTime,
          station_name: result.shop.masterRailroadStation.name,
          other_menus: result.shop.menus.map((menu) => {
            return {
              id: menu.id,
              name: menu.name,
              price: menu.price,
              shopPhoto: menu.shopPhotos.map((photo) => {
                return {
                  id: photo.id,
                  path: photo.path,
                };
              }),
            };
          }),
        },
      } as GetModalItemResponse;

      res.status(200).json(modalItem);
    });
  }
}
