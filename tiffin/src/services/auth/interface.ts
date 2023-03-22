import { User } from "@prisma/client";

export interface IAuthService {
  signIn(email: string, password: string): Promise<string | Error>;
  signUp(name: string, email: string, password: string, masterPrefectureId: number): Promise<string>;
  checkNotUsingEmail(email: string): Promise<boolean | Error>;
}
