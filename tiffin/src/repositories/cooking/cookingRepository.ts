import { Connection, RowDataPacket } from "mysql2/promise";
import { Cooking } from "../../models/cooking";
import { ICookingRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class CookingRepository implements ICookingRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async searchByKeyword(keyword: string): Promise<Error | Cooking[]> {
    try {
      const sql = "select * from master_cookings where MATCH (name) AGAINST (?)";
      const [rows] = await this.connection.execute<Cooking[] & RowDataPacket[]>(sql, [keyword]);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`CookingRepository.searchByKeyword() ERROR: ${error}`);
    }
  }

  public async getByGenre(genreId: number): Promise<Cooking[] | Error> {
    try {
      const sql = "select * from master_cookings left outer join master_genre_master_cookings on master_cookings.id = master_genre_master_cookings.master_cooking_id where master_genre_master_cookings.master_genre_id = ?";
      const [rows] = await this.connection.execute<Cooking[] & RowDataPacket[]>(sql, [genreId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target cookings`);
      }
      return rows as Cooking[];
    } catch (error) {
      return new SqlError(`CookingRepository.getByGenre() ERROR: ${error}`);
    }
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
