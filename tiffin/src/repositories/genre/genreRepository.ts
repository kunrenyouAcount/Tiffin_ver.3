import { Connection, RowDataPacket } from "mysql2/promise";
import { Genre } from "../../models/genre";
import { IGenreRepository } from "./interface";
import { SqlError } from "../../utils/error";

export class GenreRepository implements IGenreRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<Genre[] | Error> {
    try {
      const sql = "select * from master_genres";
      const [rows] = await this.connection.execute<Genre[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`GenreRepository.findAll() ERROR: ${error}`);
    }
  }
}
