export type SearchPlaceResponse = {
  prefectures: {
    id: number;
    name: string;
  }[];
  areas: {
    id: number;
    name: string;
  }[];
  detailedAreas: {
    id: number;
    name: string;
  }[];
  stations: {
    id: number;
    name: string;
  }[];
};
