import { BaseRequest } from "../../../utils/request";

export class PhotoSearchRequestValidation extends BaseRequest {
  // バリデーションのルールを設定
  protected rules() {
    return {
      type: "object",
      properties: {
        master_prefecture_id: {
          type: ["number", "null"],
        },
        master_area_id: {
          type: ["number", "null"],
        },
        master_detailed_area_id: {
          type: ["number", "null"],
        },
        master_railroad_station_id: {
          type: ["number", "null"],
        },
        master_genre_id: {
          type: ["number", "null"],
        },
        master_cooking_id: {
          type: ["number", "null"],
        },
        min_price: {
          type: ["number", "null"],
        },
        max_price: {
          type: ["number", "null"],
        },
      },
    };
  }
}
