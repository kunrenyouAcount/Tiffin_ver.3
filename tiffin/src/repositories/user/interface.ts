import { User } from "../../models/user";

export interface IUserRepository {
  getById(id: number): Promise<User | Error>;
  getByEmail(email: string): Promise<User | Error>;
  create(user: User): Promise<number | Error>;
}
