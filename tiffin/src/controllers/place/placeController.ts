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

      const responsePrefectures = results.prefectures.map((prefecture) => {
        return {
          id: prefecture.id!,
          name: prefecture.name,
          datatype: "prefecture",
        };
      }) as PlaceSearchByKeywordResponse;

      const responseAreas = results.areas.map((area) => {
        return {
          id: area.id!,
          name: area.name,
          datatype: "area",
        };
      }) as PlaceSearchByKeywordResponse;

      const responseDetailedAreas = results.detailedAreas.map((detailedArea) => {
        return {
          id: detailedArea.id!,
          name: detailedArea.name,
          datatype: "detailed-area",
        };
      }) as PlaceSearchByKeywordResponse;

      const responseStations = results.stations.map((station) => {
        return {
          id: station.id!,
          name: station.name,
          datatype: "station",
        };
      }) as PlaceSearchByKeywordResponse;

      res
        .status(200)
        .json(responsePrefectures.concat(responseAreas).concat(responseDetailedAreas).concat(responseStations));
    });
  }
}
