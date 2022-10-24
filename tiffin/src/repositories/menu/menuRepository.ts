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
    try {
      const sql = "select * from menus where master_cooking_id = ?";
      const [rows] = await this.connection.execute<Menu[] & RowDataPacket[]>(sql, [cookingId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target menus`);
      }
      return rows as Menu[];
    } catch (error) {
      return new SqlError(`MenuRepository.getByCooking() ERROR: ${error}`);
    }
  }
  public async getByStation(stationId: number): Promise<Menu[] | Error> {
    try {
      const sql =
        //joinしたテーブルと同じカラム名が存在すると、取得したときにjoin先に上書きされてしまうため、カラム指定してselectする！
        "select menus.id, menus.name, menus.price, menus.shop_id from menus inner join shops on menus.shop_id = shops.id where shops.master_railroad_station_id = ?";
      const [rows] = await this.connection.execute<Menu[] & RowDataPacket[]>(sql, [stationId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target menus`);
      }
      return rows as Menu[];
    } catch (error) {
      return new SqlError(`MenuRepository.getByStation() ERROR: ${error}`);
    }
  }
}
