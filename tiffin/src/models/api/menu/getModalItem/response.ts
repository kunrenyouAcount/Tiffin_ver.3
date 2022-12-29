export type MenuModalItemResponse = {
  id: number;
  name: string;
  price: number;
  photo_path: string;
  shop: {
    id: number;
    name: string;
    tel: string;
    opening_time: string;
    closing_time: string;
    station_name: string;
    address: string;
  };
  other_menus: {
    id: number;
    name: string;
    price: number;
    photo_path: string;
  }[];
};
