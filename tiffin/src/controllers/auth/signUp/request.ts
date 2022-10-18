import { BaseRequest } from "../../../utils/request";

export class SignUpRequest extends BaseRequest {
  // バリデーションのルールを設定
  protected rules() {
    return {
      required: ["name", "email", "password"],
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
          format: "email",
          maxLength: 50,
        },
        password: {
          type: "string",
          minLength: 8,
          maxLength: 20,
          //8文字以上20文字以下、大文字小文字英字、数字、「.?/-」許可
          pattern: "^[a-zA-Z0-9.?/-]{8,20}$",
        },
        master_prefecture_id: {
          type: "number",
        }
      },
    };
  }
}
