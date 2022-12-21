import { Connection, RowDataPacket } from "mysql2/promise";
import { DetailedGenre } from "../../models/detailedGenre";
import { IDetailedGenreRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class DetailedGenreRepository implements IDetailedGenreRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async getByGenreId(genreId: number): Promise<DetailedGenre[] | Error> {
    try {
      const sql = "select * from master_detailed_genres where master_genre_id = ?";
      const [rows] = await this.connection.execute<DetailedGenre[] & RowDataPacket[]>(sql, [genreId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target detailedGenres`);
      }
      return rows as DetailedGenre[];
    } catch (error) {
      return new SqlError(`DetailedGenreRepository.getByGenreId() ERROR: ${error}`);
    }
  }
}
