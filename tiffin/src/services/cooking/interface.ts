import { Cooking } from "../../models/cooking";

export interface ICookingService {
  findAll(): Promise<Cooking[] | Error>;
  getByGenre(): Promise<Cooking[] | Error>;
  getByDetailedGenre(): Promise<Cooking[] | Error>;
}
