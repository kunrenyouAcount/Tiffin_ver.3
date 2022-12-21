import { Connection, RowDataPacket } from "mysql2/promise";
import { Shop } from "../../models/shop";
import { NotFoundDataError, SqlError } from "../../utils/error";
import { IShopRepository } from "./interface";

export class ShopRepository implements IShopRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async getById(shopId: number): Promise<Shop | Error> {
    try {
      const sql = "select * from shops where id = ?";
      const [rows] = await this.connection.execute<Shop & RowDataPacket[]>(sql, [shopId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target shops`);
      }
      return rows as Shop;
    } catch (error) {
      return new SqlError(`ShopRepository.getById() ERROR: ${error}`);
    }
  }
}
