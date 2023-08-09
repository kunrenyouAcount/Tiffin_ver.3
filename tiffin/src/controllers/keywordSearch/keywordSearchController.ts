import { Request, Response, Router } from "express";
import { SearchEatingResponse } from "../../models/api/search/searchEating/response";
import { SearchPlaceResponse } from "../../models/api/search/searchPlace/response";
import { IKeywordSearchService } from "../../services/keywordSearch/interface";
import { authorization } from "../middlewares/auth";

export class KeywordSearchController {
  private keywordSearchService: IKeywordSearchService;
  public router: Router;

  constructor(keywordSearchService: IKeywordSearchService) {
    this.keywordSearchService = keywordSearchService;
    this.router = Router();

    this.router.get("/search-keyword/place", authorization, async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;
      const results = await this.keywordSearchService.searchPlace(keyword);

      if (
        !results.prefectures.length &&
        !results.areas.length &&
        !results.detailedAreas.length &&
        !results.stations.length
      ) {
        res.status(404).json();
        return;
      }

      const placeList = {
        prefectures: results.prefectures.map((prefecture) => {
          return {
            id: prefecture.id,
            name: prefecture.name,
          };
        }),
        areas: results.areas.map((area) => {
          return {
            id: area.id,
            name: area.name,
          };
        }),
        detailedAreas: results.detailedAreas.map((detailedArea) => {
          return {
            id: detailedArea.id,
            name: detailedArea.name,
          };
        }),
        stations: results.stations.map((station) => {
          return {
            id: station.id,
            name: station.name,
          };
        }),
      } as SearchPlaceResponse;

      res.status(200).json(placeList);
    });

    this.router.get("/search-keyword/eating/", authorization, async (req: Request, res: Response) => {
      const keyword = req.query.keyword as string;
      const results = await this.keywordSearchService.searchEating(keyword);

      if (!results.genres.length && !results.cookings.length) {
        res.status(404).json();
        return;
      }

      const eatingList = {
        genres: results.genres.map((genre) => {
          return {
            id: genre.id,
            name: genre.name,
          };
        }),
        cookings: results.cookings.map((cooking) => {
          return {
            id: cooking.id,
            name: cooking.name,
          };
        }),
      } as SearchEatingResponse;

      res.status(200).json(eatingList);
    });
  }
}
