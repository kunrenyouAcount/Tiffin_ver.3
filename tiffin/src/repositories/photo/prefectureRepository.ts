import { Connection, RowDataPacket } from "mysql2/promise";
import { Photo } from "../../models/photo";
import { IPhotoRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class PhotoRepository implements IPhotoRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<Photo[] | Error> {
    try {
      const sql = "select * from photos";
      const [rows] = await this.connection.execute<Photo[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`PhotoRepository.findAll() ERROR: ${error}`);
    }
  }

  public async getById(id: number): Promise<Photo | Error> {
    try {
      const sql = "select * from photos where id = ?";
      const [rows] = await this.connection.execute<Photo & RowDataPacket[]>(sql, [id]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target photos`);
      }
      return rows[0] as Photo;
    } catch (error) {
      return new SqlError(`PhotoRepository.getById() ERROR: ${error}`);
    }
  }
}
