import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { RailroadStation } from "../../models/railroadStation";
import { IRailroadStationRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";

export class RailroadStationRepository implements IRailroadStationRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<RailroadStation[] | Error> {
    try {
      const sql = "select * from master_railroad_stations";
      const [rows] = await this.connection.execute<RailroadStation[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`RailroadStationRepository.findAll() ERROR: ${error}`);
    }
  }

  public async getByPrefectureId(prefectureId: number): Promise<RailroadStation[] | Error> {
    try {
      const sql = "select * from master_railroad_stations where master_prefecture_id = ?";
      const [rows] = await this.connection.execute<RailroadStation[] & RowDataPacket[]>(sql, [prefectureId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target railroadStations`);
      }
      return rows as RailroadStation[];
    } catch (error) {
      return new SqlError(`RailroadStationRepository.getByPrefectureId() ERROR: ${error}`);
    }
  }
}
