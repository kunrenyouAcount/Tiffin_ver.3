import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { DetailedArea } from "../../models/detailedArea";
import { IDetailedAreaRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class DetailedAreaRepository implements IDetailedAreaRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<DetailedArea[] | Error> {
    try {
      const sql = "select * from master_detailed_areas";
      const [rows] = await this.connection.execute<DetailedArea[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`DetailedAreaRepository.findAll() ERROR: ${error}`);
    }
  }

  public async getByAreaId(areaId: number): Promise<DetailedArea[] | Error> {
    try {
      const sql = "select * from master_detailed_areas where master_area_id = ?";
      const [rows] = await this.connection.execute<DetailedArea[] & RowDataPacket[]>(sql, [areaId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target detailedAreas`);
      }
      return rows as DetailedArea[];
    } catch (error) {
      return new SqlError(`DetailedAreaRepository.getById() ERROR: ${error}`);
    }
  }
}