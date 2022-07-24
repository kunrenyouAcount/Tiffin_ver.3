import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { MasterPrefecture } from "../models/masterPrefecture";
import { IMasterPrefectureRepository } from "./interface";
import { SqlError } from "../utils/error";

export class MasterPrefectureRepository implements IMasterPrefectureRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<MasterPrefecture[] | Error> {
    try {
      const sql = "select * from master_prefectures";
      const [rows] = await this.connection.execute<MasterPrefecture[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`MasterPrefectureRepository.findAll() ERROR: ${error}`);
    }
  }
}
