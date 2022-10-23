import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Cooking } from "../../models/cooking";
import { ICookingRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class CookingRepository implements ICookingRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  getByGenre(): Promise<Cooking[] | Error> {
    throw new Error("Method not implemented.");
  }
  getByDetailedGenre(): Promise<Cooking[] | Error> {
    throw new Error("Method not implemented.");
  }

  public async findAll(): Promise<Cooking[] | Error> {
    try {
      const sql = "select * from master_cookings";
      const [rows] = await this.connection.execute<Cooking[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`CookingRepository.findAll() ERROR: ${error}`);
    }
  }
}
