import { Connection, RowDataPacket } from "mysql2/promise";
import { Prefecture } from "../../models/prefecture";
import { IPrefectureRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class PrefectureRepository implements IPrefectureRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async searchByKeyword(keyword: string): Promise<Error | Prefecture[]> {
    try {
      const sql = "select * from master_prefectures where name like ?";
      const [rows] = await this.connection.execute<Prefecture[] & RowDataPacket[]>(sql, [`%${keyword}%`]);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`PrefectureRepository.searchByKeyword() ERROR: ${error}`);
    }
  }

  public async findAll(): Promise<Prefecture[] | Error> {
    try {
      const sql = "select * from master_prefectures";
      const [rows] = await this.connection.execute<Prefecture[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`PrefectureRepository.findAll() ERROR: ${error}`);
    }
  }

  public async getById(id: number): Promise<Prefecture | Error> {
    try {
      const sql = "select * from master_prefectures where id = ?";
      const [rows] = await this.connection.execute<Prefecture & RowDataPacket[]>(sql, [id]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target prefectures`);
      }
      return rows[0] as Prefecture;
    } catch (error) {
      return new SqlError(`PrefectureRepository.getById() ERROR: ${error}`);
    }
  }
}
