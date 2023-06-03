import { ShopPhoto } from "@prisma/client";

export interface IPhotoService {
  findAll(): Promise<ShopPhoto[]>;
  getById(id: number): Promise<ShopPhoto | null>;
  search(
    prefectureId: number | null,
    areaId: number | null,
    detailedAreaId: number | null,
    railroadStationId: number | null,
    genreId: number | null,
    cookingId: number | null,
    minPrice: number | null,
    maxPrice: number | null
  ): Promise<ShopPhoto[]>;
}
