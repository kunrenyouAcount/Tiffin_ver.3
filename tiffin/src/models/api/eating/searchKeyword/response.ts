export type EatingSearchByKeywordResponse = {
  genres: {
    id: number;
    name: string;
  }[];
  detailedGenres: {
    id: number;
    name: string;
  }[];
  cookings: {
    id: number;
    name: string;
  }[];
};
