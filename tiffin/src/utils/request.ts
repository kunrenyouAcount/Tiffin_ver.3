import ajv, { Ajv } from "ajv";
import { ValidationError } from "./error";

export abstract class BaseRequest {
  private ajv: Ajv;

  constructor() {
    this.ajv = new ajv();
  }

  public validate(params: any) {
    const validate = this.ajv.compile(this.rules());

    const valid = validate(params);

    if (!valid) {
      return new ValidationError(validate.errors!);
    }
    return params;
  }

  // バリデーションのルールを設定
  protected abstract rules(): object;
}
