import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Cooking } from "../../models/cooking";
import { ICookingRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class CookingRepository implements ICookingRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  public async getByGenre(genreId: number): Promise<Cooking[] | Error> {
    try {
      const sql = "select * from master_cookings where master_genre_id = ?";
      const [rows] = await this.connection.execute<Cooking[] & RowDataPacket[]>(sql, [genreId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target cookings`);
      }
      return rows as Cooking[];
    } catch (error) {
      return new SqlError(`CookingRepository.getByGenre() ERROR: ${error}`);
    }
  }

  public async getByDetailedGenre(detailedGenreId: number): Promise<Cooking[] | Error> {
    try {
      const sql = "select * from master_cookings where master_detailed_genre_id = ?";
      const [rows] = await this.connection.execute<Cooking[] & RowDataPacket[]>(sql, [detailedGenreId]);
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
