import { BaseRequest } from "../../../utils/request";

export class LikeAddRequestValidation extends BaseRequest {
  // バリデーションのルールを設定
  protected rules() {
    return {
      type: "object",
      required: ["shop_photo_id"],
      properties: {
        shop_photo_id: {
          type: ["number"],
        },
      },
    };
  }
}
