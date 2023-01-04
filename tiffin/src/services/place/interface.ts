import { Area } from "../../models/area";
import { DetailedArea } from "../../models/detailedArea";
import { Prefecture } from "../../models/prefecture";
import { RailroadStation } from "../../models/railroadStation";

export interface IPlaceService {
  searchByKeyword(keyword: string): Promise<
    | {
        prefectures: Prefecture[];
        areas: Area[];
        detailedAreas: DetailedArea[];
        stations: RailroadStation[];
      }
    | Error
  >;
}
