export type MenuModalItemResponse = {
  id: number
  name: string
  price: number
  photo_path: string
  shop_name: string
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
  shop_name: '',
  other_menus: [],
}
