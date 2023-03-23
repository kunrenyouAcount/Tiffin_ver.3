import { Connection, RowDataPacket } from "mysql2/promise";
import { NotFoundDataError, SqlError } from "../../utils/error";
import { IShopPhotoLikeRepository } from "./interface";

export class ShopPhotoLikeRepository implements IShopPhotoLikeRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  public async create(userId: number, shopPhotoId: number): Promise<void | Error> {
    try {
      const sql = "insert into shop_photo_likes (user_id, shop_photo_id) values (?, ?)";
      await this.connection.execute<void & RowDataPacket[]>(sql, [userId, shopPhotoId]);
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.create() ERROR: ${error}`);
    }
  }

  public async delete(userId: number, shopPhotoId: number): Promise<void | Error> {
    try {
      const sql = "delete from shop_photo_likes where user_id = ? and shop_photo_id = ?";
      await this.connection.execute<void & RowDataPacket[]>(sql, [userId, shopPhotoId]);
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.delete() ERROR: ${error}`);
    }
  }
}
