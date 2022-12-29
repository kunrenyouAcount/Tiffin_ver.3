export type MenuModalItemResponse = {
  id: number
  name: string
  price: number
  photo_path: string
  shop: {
    id: number
    name: string
    tel: string
    opening_time: string
    closing_time: string
    station_name: string
    address: string
  }
  other_menus: {
    id: number
    name: string
    price: number
    photo_path: string
  }[]
}

export const initMenuModalItemResponse: MenuModalItemResponse = {
  id: 0,
  name: '',
  price: 0,
  photo_path: '',
  shop: {
    id: 0,
    name: '',
    tel: '',
    opening_time: '',
    closing_time: '',
    station_name: '',
    address: '',
  },
  other_menus: [],
}
