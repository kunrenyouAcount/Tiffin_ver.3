export type MenuModalItemResponse = {
  id: number;
  name: string;
  price: number;
  photo_path: string;
  shop_name: string;
  other_menus: {
    id: number;
    name: string;
    price: number;
    photo_path: string;
  }[];
};
