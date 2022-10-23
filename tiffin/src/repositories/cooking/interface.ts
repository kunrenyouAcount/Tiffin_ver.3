import { Cooking } from "../../models/cooking";

export interface ICookingRepository {
  findAll(): Promise<Cooking[] | Error>;
  getByGenre(): Promise<Cooking[] | Error>;
  getByDetailedGenre(): Promise<Cooking[] | Error>;
}
