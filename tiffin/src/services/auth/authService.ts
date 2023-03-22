import { compare, hash } from "bcrypt";
import { AccessTokenPayload, generateAccessToken } from "../../utils/token";
import { IAuthService } from "./interface";
import { MismatchEmailOrPassword, NotFoundDataError } from "../../utils/error";
import { PrismaClient, User } from "@prisma/client";

export class AuthService implements IAuthService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async signIn(email: string, password: string): Promise<string | Error> {
    const result = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (result === null) {
      return new NotFoundDataError(`not exists target User`);
    }

    const user: User = result;
    const isMatchPassword = await compare(password, user.password);

    if (!isMatchPassword) {
      return new MismatchEmailOrPassword("mismatch email or password");
    }

    const payload: AccessTokenPayload = {
      userId: user.id as number,
      name: user.name,
      email: user.email,
    };

    return generateAccessToken(payload);
  }

  public async signUp(name: string, email: string, password: string, masterPrefectureId: number): Promise<string> {
    const hashedPassword: string = await hash(password, 10);
    password = hashedPassword;

    const result = await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        masterPrefectureId: masterPrefectureId,
      },
    });
    const createdId: number = result.id;

    const payload: AccessTokenPayload = {
      userId: createdId,
      name: name,
      email: email,
    };

    return generateAccessToken(payload);
  }

  public async checkNotUsingEmail(email: string): Promise<boolean | Error> {
    const result = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (result === null) {
      return new NotFoundDataError(`not exists target User`);
    }
    return false;
  }
}
