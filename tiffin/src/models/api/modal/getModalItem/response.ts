export type ModalItemGetResponse = {
  id: number;
  name: string;
  price: number;
  shopPhoto: {
    id: number;
    path: string;
  }[];
  shop: {
    id: number;
    name: string;
    address: string;
    tel: string;
    opening_time: string;
    closing_time: string;
    station_name: string;
    other_menus: {
      id: number;
      name: string;
      price: number;
      shopPhoto: {
        id: number;
        path: string;
      }[];
    }[];
  };
};
