import { Connection } from "mysql2/promise";
import { AccessTokenPayload, generateAccessToken } from "../../../utils/token";
import { createUserHashedPasswordTestData } from "./createUserTestData";

export async function createTokenTestData(connection: Connection) {
  const user = (await createUserHashedPasswordTestData(connection, 1))[0];

  const payload: AccessTokenPayload = {
    userId: user.id as number,
    name: user.name,
    email: user.email,
  };
  return generateAccessToken(payload);
}
