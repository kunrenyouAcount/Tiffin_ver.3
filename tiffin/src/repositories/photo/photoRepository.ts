import { Connection, RowDataPacket } from "mysql2/promise";
import { Photo } from "../../models/photo";
import { IPhotoRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";
import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";

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

  public async getByMenuId(menuId: number): Promise<Error | Photo> {
    try {
      const sql = "select * from photos where menu_id = ?";
      const [rows] = await this.connection.execute<Photo & RowDataPacket[]>(sql, [menuId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target photos`);
      }
      return rows[0] as Photo;
    } catch (error) {
      return new SqlError(`PhotoRepository.getByMenuId() ERROR: ${error}`);
    }
  }

  public async getByMenuIds(menuIds: number[]): Promise<Error | Photo[]> {
    try {
      const sql = "select * from photos where menu_id in (?)";
      const [rows] = await this.connection.query<Photo[] & RowDataPacket[]>(sql, [menuIds]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target photos`);
      }
      return rows as Photo[];
    } catch (error) {
      return new SqlError(`PhotoRepository.getByMenuIds() ERROR: ${error}`);
    }
  }

  public async choiceSearch(params: PhotoChoiceSearchRequest): Promise<Error | Photo[]> {
    try {
      var sql =
        "select photos.id, photos.path, photos.menu_id from photos \
        inner join menus on photos.menu_id = menus.id \
        inner join master_genres on menus.master_genre_id = master_genres.id \
        left outer join master_detailed_genres on menus.master_detailed_genre_id = master_detailed_genres.id \
        inner join master_cookings on menus.master_cooking_id = master_cookings.id \
        inner join shops on menus.shop_id = shops.id \
        inner join master_areas on shops.master_area_id = master_areas.id \
        inner join master_prefectures on master_areas.master_prefecture_id = master_prefectures.id \
        left outer join master_detailed_areas on shops.master_detailed_area_id = master_detailed_areas.id \
        inner join master_railroad_stations on shops.master_railroad_station_id = master_railroad_stations.id \
        where 1 = 1";
      //この後のsqlのwhere条件をand接頭で揃えるために「where 1 = 1」を記載

      if (params.master_prefecture_id !== 0) {
        sql += ` and master_prefectures.id = ${params.master_prefecture_id}`;
      }
      if (params.master_area_id !== 0) {
        sql += ` and master_areas.id = ${params.master_area_id}`;
      }
      if (params.master_detailed_area_id !== 0) {
        sql += ` and master_detailed_areas.id = ${params.master_detailed_area_id}`;
      }
      if (params.master_railroad_station_id !== 0) {
        sql += ` and master_railroad_stations.id = ${params.master_railroad_station_id}`;
      }
      if (params.master_cooking_id !== 0) {
        sql += ` and master_cookings.id = ${params.master_cooking_id}`;
      }
      if (params.master_genre_id !== 0) {
        sql += ` and master_genres.id = ${params.master_genre_id}`;
      }
      if (params.master_detailed_genre_id !== 0) {
        sql += ` and master_detailed_genres.id = ${params.master_detailed_genre_id}`;
      }
      if (params.price_min !== 0) {
        sql += ` and ${params.price_min} <= menus.price`;
      }
      if (params.price_max !== 0) {
        sql += ` and menus.price <= ${params.price_max}`;
      }
      sql += ";";

      const [rows] = await this.connection.execute<Photo[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target photos`);
      }
      return rows as Photo[];
    } catch (error) {
      return new SqlError(`PhotoRepository.choiceSearch() ERROR: ${error}`);
    }
  }
}
