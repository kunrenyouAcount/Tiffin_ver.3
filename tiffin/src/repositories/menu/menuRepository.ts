import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { NotFoundDataError, SqlError } from "../../utils/error";
import { Menu } from "../../models/menu";
import { IMenuRepository } from "./interface";

export class MenuRepository implements IMenuRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  public async getByGenre(genreId: number): Promise<Menu[] | Error> {
    try {
      const sql = "select * from menus where master_genre_id = ?";
      const [rows] = await this.connection.execute<Menu[] & RowDataPacket[]>(sql, [genreId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target menus`);
      }
      return rows as Menu[];
    } catch (error) {
      return new SqlError(`MenuRepository.getByGenre() ERROR: ${error}`);
    }
  }
  public async getByCooking(cookingId: number): Promise<Menu[] | Error> {
    throw new Error("Method not implemented.");
  }
  public async getByStation(stationId: number): Promise<Menu[] | Error> {
    throw new Error("Method not implemented.");
  }
}
