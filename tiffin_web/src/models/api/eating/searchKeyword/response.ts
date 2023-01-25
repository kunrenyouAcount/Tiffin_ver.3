export type EatingSearchByKeywordResponse = {
  genres: {
    id: number
    name: string
  }[]
  cookings: {
    id: number
    name: string
  }[]
}

export const initEatingSearchByKeywordResponse = {
  genres: [],
  cookings: [],
}
