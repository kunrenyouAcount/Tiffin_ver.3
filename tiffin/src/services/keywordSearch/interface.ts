import {
  MasterArea,
  MasterCooking,
  MasterDetailedArea,
  MasterGenre,
  MasterPrefecture,
  MasterRailroadStation,
} from "@prisma/client";

export interface IKeywordSearchService {
  searchPlace(keyword: string): Promise<{
    prefectures: MasterPrefecture[];
    areas: MasterArea[];
    detailedAreas: MasterDetailedArea[];
    stations: MasterRailroadStation[];
  }>;
  searchEating(keyword: string): Promise<{
    genres: MasterGenre[];
    cookings: MasterCooking[];
  }>;
}
