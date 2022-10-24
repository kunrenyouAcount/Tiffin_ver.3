import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Area } from "../../models/area";
import { IAreaRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class AreaRepository implements IAreaRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<Area[] | Error> {
    try {
      const sql = "select * from master_areas";
      const [rows] = await this.connection.execute<Area[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`AreaRepository.findAll() ERROR: ${error}`);
    }
  }

  public async getByPrefectureId(prefectureId: number): Promise<Area[] | Error> {
    try {
      const sql = "select * from master_areas where master_prefecture_id = ?";
      const [rows] = await this.connection.execute<Area[] & RowDataPacket[]>(sql, [prefectureId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target areas`);
      }
      return rows as Area[];
    } catch (error) {
      return new SqlError(`AreaRepository.getByPrefectureId() ERROR: ${error}`);
    }
  }
}
