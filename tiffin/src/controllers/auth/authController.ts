import { IAuthService } from "../../services/auth/interface";
import { Request, Response, Router } from "express";
import { MismatchEmailOrPassword, NotFoundDataError, ValidationError } from "../../utils/error";
import { User } from "../../models/user";
import { SigninRequestValidation } from "./signIn/requestValidation";
import { SignupRequestValidation } from "./signUp/requestValidation";
import { AuthSigninRequest } from "../../models/api/auth/signin/request";
import { AuthSignupRequest } from "../../models/api/auth/signup/request";

export class AuthController {
  private authService: IAuthService;
  public router: Router;

  constructor(authService: IAuthService) {
    this.authService = authService;
    this.router = Router();

    this.router.post("/auth/signin", async (req: Request, res: Response) => {
      const validation = new SigninRequestValidation();
      const validated: AuthSigninRequest | ValidationError = validation.validate(req.body);
      if (validated instanceof ValidationError) {
        res.status(422).json(validated.err);
        return;
      }

      const result = await this.authService.signIn(validated.email, validated.password);

      if (result instanceof NotFoundDataError) {
        res.status(404).json(result.message);
        return;
      }

      if (result instanceof MismatchEmailOrPassword) {
        res.status(401).json(result.message);
        return;
      }

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      res.status(200).json(result);
    });

    this.router.post("/auth/signup", async (req: Request, res: Response) => {
      const validation = new SignupRequestValidation();
      const validated: AuthSignupRequest | ValidationError = validation.validate(req.body);
      if (validated instanceof ValidationError) {
        res.status(422).json(validated.err);
        return;
      }
      const isNotUsedEmail = await this.authService.checkNotUsingEmail(validated.email);
      if (!isNotUsedEmail) {
        res.status(403).json("このメールアドレスは使用済みです");
        return;
      }

      const user: User = validated;
      const result = await this.authService.signUp(user);

      if (result instanceof Error) {
        res.status(500).json(result.message);
        return;
      }

      res.status(200).json(result);
    });
  }
}
