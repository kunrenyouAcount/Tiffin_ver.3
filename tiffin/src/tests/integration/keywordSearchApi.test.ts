import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterAreaSeed, masterGenreSeed, masterPrefectureSeed } from "../../../prisma/seed";
import { SearchPlaceResponse } from "../../models/api/search/searchPlace/response";
import { SearchEatingResponse } from "../../models/api/search/searchEating/response";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let prisma = new PrismaClient();

beforeEach(async () => {
  const prisma = new PrismaClient();
  await truncate(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("API search-keyword", () => {
  describe("GET /search-keyword/place/?keyword=", () => {
    it("should return 2 prefectures and 200 status", async () => {
      const prefectureMocks = [
        {
          id: 3,
          name: "秋田県",
        },
        {
          id: 8,
          name: "東京都",
        },
        {
          id: 26,
          name: "京都府",
        },
      ];

      await prisma.masterPrefecture.createMany({ data: prefectureMocks });

      const keyword = "京";

      const response = await axios.get<SearchPlaceResponse>(
        `/api/search-keyword/place/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);
      expect(response.data.prefectures.length).toBe(2);

      for (const result of response.data.prefectures) {
        const prefecture = prefectureMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(prefecture!.name);
      }
    });
    it("should return 2 areas and 200 status", async () => {
      await masterPrefectureSeed(prisma);

      const areaMocks = [
        {
          id: 39,
          name: "銀座・新橋・有楽町",
          masterPrefectureId: 8,
        },
        {
          id: 40,
          name: "東京・日本橋",
          masterPrefectureId: 8,
        },
        {
          id: 42,
          name: "新宿・代々木・大久保",
          masterPrefectureId: 8,
        },
      ];

      await prisma.masterArea.createMany({ data: areaMocks });

      const keyword = "新";

      const response = await axios.get<SearchPlaceResponse>(
        `/api/search-keyword/place/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);
      expect(response.data.areas.length).toBe(2);

      for (const result of response.data.areas) {
        const area = areaMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(area!.name);
      }
    });
    it("should return 2 detailedAreas and 200 status", async () => {
      await masterPrefectureSeed(prisma);
      await masterAreaSeed(prisma);

      const detailedAreaMocks = [
        {
          id: 5,
          name: "有楽町・日比谷",
          masterAreaId: 39,
        },
        {
          id: 6,
          name: "新橋・汐留",
          masterAreaId: 39,
        },
        {
          id: 13,
          name: "新宿",
          masterAreaId: 42,
        },
      ];

      await prisma.masterDetailedArea.createMany({ data: detailedAreaMocks });

      const keyword = "新";

      const response = await axios.get<SearchPlaceResponse>(
        `/api/search-keyword/place/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);
      expect(response.data.detailedAreas.length).toBe(2);

      for (const result of response.data.detailedAreas) {
        const detailedArea = detailedAreaMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(detailedArea!.name);
      }
    });

    it("should return 2 stations and 200 status", async () => {
      await masterPrefectureSeed(prisma);

      const stationMocks = [
        {
          id: 1130102,
          name: "新橋",
          postCode: "105-0004",
          address: "東京都港区新橋二丁目17",
          status: 0,
          masterPrefectureId: 8,
        },
        {
          id: 1130208,
          name: "新宿",
          postCode: "160-0022",
          address: "東京都新宿区新宿三丁目38-1",
          status: 0,
          masterPrefectureId: 8,
        },
        {
          id: 1130210,
          name: "高田馬場",
          postCode: "169-0075",
          address: "東京都新宿区高田馬場一丁目35-1",
          status: 0,
          masterPrefectureId: 8,
        },
      ];

      await prisma.masterRailroadStation.createMany({ data: stationMocks });

      const keyword = "新";

      const response = await axios.get<SearchPlaceResponse>(
        `/api/search-keyword/place/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);
      expect(response.data.stations.length).toBe(2);

      for (const result of response.data.stations) {
        const station = stationMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(station!.name);
      }
    });

    it("should return 1 prefectures, 2 areas, 2 detailedAreas, 2 stations and 200 status", async () => {
      const prefectureMocks = [
        {
          id: 3,
          name: "秋田県",
        },
        {
          id: 8,
          name: "東京都",
        },
        {
          id: 21,
          name: "新潟県",
        },
        {
          id: 26,
          name: "京都府",
        },
      ];

      await prisma.masterPrefecture.createMany({ data: prefectureMocks });

      const areaMocks = [
        {
          id: 39,
          name: "銀座・新橋・有楽町",
          masterPrefectureId: 8,
        },
        {
          id: 40,
          name: "東京・日本橋",
          masterPrefectureId: 8,
        },
        {
          id: 42,
          name: "新宿・代々木・大久保",
          masterPrefectureId: 8,
        },
      ];

      await prisma.masterArea.createMany({ data: areaMocks });

      const detailedAreaMocks = [
        {
          id: 5,
          name: "有楽町・日比谷",
          masterAreaId: 39,
        },
        {
          id: 6,
          name: "新橋・汐留",
          masterAreaId: 39,
        },
        {
          id: 13,
          name: "新宿",
          masterAreaId: 42,
        },
      ];

      await prisma.masterDetailedArea.createMany({ data: detailedAreaMocks });

      const stationMocks = [
        {
          id: 1130102,
          name: "新橋",
          postCode: "105-0004",
          address: "東京都港区新橋二丁目17",
          status: 0,
          masterPrefectureId: 8,
        },
        {
          id: 1130208,
          name: "新宿",
          postCode: "160-0022",
          address: "東京都新宿区新宿三丁目38-1",
          status: 0,
          masterPrefectureId: 8,
        },
        {
          id: 1130210,
          name: "高田馬場",
          postCode: "169-0075",
          address: "東京都新宿区高田馬場一丁目35-1",
          status: 0,
          masterPrefectureId: 8,
        },
      ];

      await prisma.masterRailroadStation.createMany({ data: stationMocks });

      const keyword = "新";

      const response = await axios.get<SearchPlaceResponse>(
        `/api/search-keyword/place/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);

      expect(response.data.prefectures.length).toBe(1);
      for (const result of response.data.prefectures) {
        const prefecture = prefectureMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(prefecture!.name);
      }

      expect(response.data.areas.length).toBe(2);
      for (const result of response.data.areas) {
        const area = areaMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(area!.name);
      }

      expect(response.data.detailedAreas.length).toBe(2);
      for (const result of response.data.detailedAreas) {
        const detailedArea = detailedAreaMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(detailedArea!.name);
      }

      expect(response.data.stations.length).toBe(2);
      for (const result of response.data.stations) {
        const station = stationMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(station!.name);
      }
    });

    it("should return 404 status", async () => {
      const keyword = "HITしない";
      const response = await axios.get<SearchPlaceResponse>(
        `api/search-keyword/place/?keyword=${encodeURIComponent(keyword)}`
      );
      expect(response.status).toBe(404);
    });
  });
  describe("GET /search-keyword/eating/?keyword=", () => {
    it("should return 2 genres and 200 status", async () => {
      const genreMocks = [
        {
          id: 3,
          name: "そば",
        },
        {
          id: 4,
          name: "うどん",
        },
        {
          id: 5,
          name: "焼きそば",
        },
      ];

      await prisma.masterGenre.createMany({ data: genreMocks });

      const keyword = "そば";

      const response = await axios.get<SearchEatingResponse>(
        `/api/search-keyword/eating/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);
      expect(response.data.genres.length).toBe(2);

      for (const result of response.data.genres) {
        const genre = genreMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(genre!.name);
      }
    });
    it("should return 2 cookings and 200 status", async () => {
      const cookingMocks = [
        {
          id: 2,
          name: "かけそば",
        },
        {
          id: 3,
          name: "かけうどん",
        },
        {
          id: 4,
          name: "塩焼きそば",
        },
      ];

      await prisma.masterCooking.createMany({ data: cookingMocks });

      const keyword = "そば";

      const response = await axios.get<SearchEatingResponse>(
        `/api/search-keyword/eating/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);
      expect(response.data.cookings.length).toBe(2);

      for (const result of response.data.cookings) {
        const cooking = cookingMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(cooking!.name);
      }
    });

    it("should return 2 genres, 2 cookings 200 status", async () => {
      const genreMocks = [
        {
          id: 3,
          name: "そば",
        },
        {
          id: 4,
          name: "うどん",
        },
        {
          id: 5,
          name: "焼きそば",
        },
      ];

      await prisma.masterGenre.createMany({ data: genreMocks });

      const cookingMocks = [
        {
          id: 2,
          name: "かけそば",
        },
        {
          id: 3,
          name: "かけうどん",
        },
        {
          id: 4,
          name: "塩焼きそば",
        },
      ];

      await prisma.masterCooking.createMany({ data: cookingMocks });

      const keyword = "そば";

      const response = await axios.get<SearchEatingResponse>(
        `/api/search-keyword/eating/?keyword=${encodeURIComponent(keyword)}`
      );

      expect(response.status).toBe(200);

      expect(response.data.genres.length).toBe(2);
      for (const result of response.data.genres) {
        const genre = genreMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(genre!.name);
      }

      expect(response.data.cookings.length).toBe(2);
      for (const result of response.data.cookings) {
        const cooking = cookingMocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(cooking!.name);
      }
    });

    it("should return 404 status", async () => {
      const keyword = "HITしない";
      const response = await axios.get<SearchEatingResponse>(
        `api/search-keyword/eating/?keyword=${encodeURIComponent(keyword)}`
      );
      expect(response.status).toBe(404);
    });
  });
});
