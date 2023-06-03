export type PhotoSearchRequest = {
  master_prefecture_id: number | null;
  master_area_id: number | null;
  master_detailed_area_id: number | null;
  master_railroad_station_id: number | null;
  master_genre_id: number | null;
  master_cooking_id: number | null;
  price_min: number | null;
  price_max: number | null;
};
