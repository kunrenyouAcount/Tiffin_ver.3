export type ModalItemGetResponse = {
  id: number
  name: string
  price: number
  shopPhoto: {
    id: number
    path: string
  }[]
  shop: {
    id: number
    name: string
    address: string
    tel: string
    opening_time: string
    closing_time: string
    station_name: string
    other_menus: {
      id: number
      name: string
      price: number
      shopPhoto: {
        id: number
        path: string
      }[]
    }[]
  }
}

export const initModalItemGetResponse: ModalItemGetResponse = {
  id: 0,
  name: '',
  price: 0,
  shopPhoto: [
    {
      id: 0,
      path: '',
    },
  ],
  shop: {
    id: 0,
    name: '',
    address: '',
    tel: '',
    opening_time: '',
    closing_time: '',
    station_name: '',
    other_menus: [
      {
        id: 0,
        name: '',
        price: 0,
        shopPhoto: [
          {
            id: 0,
            path: '',
          },
        ],
      },
    ],
  },
}
