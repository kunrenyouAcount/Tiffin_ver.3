import { Request, Response, Router } from "express";
import { PlaceSearchByKeywordResponse } from "../../models/api/place/searchKeyword/response";
import { IPlaceService } from "../../services/place/interface";

export class PlaceController {
  private placeService: IPlaceService;
  public router: Router;

  constructor(placeService: IPlaceService) {
    this.placeService = placeService;
    this.router = Router();

    this.router.get("/places/search-keyword/", async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;
      const results = await this.placeService.searchByKeyword(keyword);

      if (results instanceof Error) {
        res.status(500).json(results.message);
        return;
      }

      const placeResponse = {
        prefectures: results.prefectures.map((prefecture) => {
          return {
            id: prefecture.id!,
            name: prefecture.name,
          };
        }),
        areas: results.areas.map((area) => {
          return {
            id: area.id!,
            name: area.name,
          };
        }),
        detailedAreas: results.detailedAreas.map((detailedArea) => {
          return {
            id: detailedArea.id!,
            name: detailedArea.name,
          };
        }),
        stations: results.stations.map((station) => {
          return {
            id: station.id!,
            name: station.name,
          };
        }),
      } as PlaceSearchByKeywordResponse;
      res.status(200).json(placeResponse);
    });
  }
}