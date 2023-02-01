import { Connection, RowDataPacket } from "mysql2/promise";
import { ShopPhoto } from "../../models/shopPhoto";
import { IShopPhotoRepository } from "./interface";
import { NotFoundDataError, SqlError } from "../../utils/error";
import { PhotoChoiceSearchRequest } from "../../models/api/photo/choiceSearch/request";

export class ShopPhotoRepository implements IShopPhotoRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  public async findAll(): Promise<ShopPhoto[] | Error> {
    try {
      const sql = "select * from shop_photos";
      const [rows] = await this.connection.execute<ShopPhoto[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return [];
      }
      return rows;
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.findAll() ERROR: ${error}`);
    }
  }

  public async getById(id: number): Promise<ShopPhoto | Error> {
    try {
      const sql = "select * from shop_photos where id = ?";
      const [rows] = await this.connection.execute<ShopPhoto & RowDataPacket[]>(sql, [id]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target shop_photos`);
      }
      return rows[0] as ShopPhoto;
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.getById() ERROR: ${error}`);
    }
  }

  public async getByMenuId(menuId: number): Promise<Error | ShopPhoto> {
    try {
      const sql = "select * from shop_photos where menu_id = ?";
      const [rows] = await this.connection.execute<ShopPhoto & RowDataPacket[]>(sql, [menuId]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target shop_photos`);
      }
      return rows[0] as ShopPhoto;
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.getByMenuId() ERROR: ${error}`);
    }
  }

  public async getByMenuIds(menuIds: number[]): Promise<Error | ShopPhoto[]> {
    try {
      const sql = "select * from shop_photos where menu_id in (?)";
      const [rows] = await this.connection.query<ShopPhoto[] & RowDataPacket[]>(sql, [menuIds]);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target shop_photos`);
      }
      return rows as ShopPhoto[];
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.getByMenuIds() ERROR: ${error}`);
    }
  }

  public async choiceSearch(params: PhotoChoiceSearchRequest): Promise<Error | ShopPhoto[]> {
    try {
      var sql =
        "select distinct(shop_photos.id) from shop_photos \
        inner join menus on shop_photos.menu_id = menus.id \
        inner join master_cookings on menus.master_cooking_id = master_cookings.id \
        left outer join master_genre_master_cookings on master_cookings.id = master_genre_master_cookings.master_cooking_id \
        left outer join master_genres on master_genre_master_cookings.master_genre_id = master_genres.id \
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
      if (params.price_min !== 0) {
        sql += ` and ${params.price_min} <= menus.price`;
      }
      if (params.price_max !== 0) {
        sql += ` and menus.price <= ${params.price_max}`;
      }
      sql += ";";

      const [rows] = await this.connection.execute<{ id: number }[] & RowDataPacket[]>(sql);
      if (rows.length === 0) {
        return new NotFoundDataError(`not exists target shop_photos`);
      }

      const ids = rows.map((row) => row.id);
      sql = "select * from shop_photos where id in (?)";
      const [results] = await this.connection.query<ShopPhoto[] & RowDataPacket[]>(sql, [ids]);
      return results as ShopPhoto[];
    } catch (error) {
      return new SqlError(`ShopPhotoRepository.choiceSearch() ERROR: ${error}`);
    }
  }
}
