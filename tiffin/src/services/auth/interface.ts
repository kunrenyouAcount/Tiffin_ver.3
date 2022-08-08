import { User } from "../../models/user";

export interface IAuthService {
  signIn(email: string, password: string): Promise<string | Error>;
  signUp(user: User): Promise<string | Error>;
  checkNotUsingEmail(email: string): Promise<boolean | Error>;
}
