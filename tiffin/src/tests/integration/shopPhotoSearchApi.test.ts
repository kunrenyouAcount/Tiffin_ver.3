import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient, Shop } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import {
  masterAreaSeed,
  masterCookingSeed,
  masterDetailedAreaSeed,
  masterGenreMasterCookingSeed,
  masterGenreSeed,
  masterPrefectureSeed,
  masterRailroadStationSeed,
  shopSeed,
  shopUserSeed,
} from "../../../prisma/seed";
import { PhotoGetResponse } from "../../models/api/photo/get/response";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let prisma = new PrismaClient();

beforeEach(async () => {
  const prisma = new PrismaClient();
  await truncate(prisma);
  await masterPrefectureSeed(prisma);
  await masterGenreSeed(prisma);
  await masterCookingSeed(prisma);
  await shopUserSeed(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("API photos", () => {
  describe("GET /photos/search", () => {
    it("search genre should return 2 photos and 200 status", async () => {
      await masterAreaSeed(prisma);
      await masterDetailedAreaSeed(prisma);
      await masterRailroadStationSeed(prisma);
      await shopSeed(prisma);
      const menuMocks = [
        {
          id: 2,
          name: "かけそば",
          price: 400,
          masterCookingId: 2,
          shopId: 3,
        },
        {
          id: 3,
          name: "冷やしぶっかけうどん",
          price: 300,
          masterCookingId: 3,
          shopId: 3,
        },
        {
          id: 19,
          name: "わかめそば（温）",
          price: 280,
          masterCookingId: 19,
          shopId: 3,
        },
        {
          id: 20,
          name: "わかめうどん（温）",
          price: 280,
          masterCookingId: 20,
          shopId: 3,
        },
      ];
      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: 3,
        },
        {
          id: 19,
          path: "/images/sample/sample019.jpeg",
          menuId: 19,
        },
        {
          id: 20,
          path: "/images/sample/sample020.jpeg",
          menuId: 20,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const genreCookingMocks = [
        {
          masterGenreId: 3,
          masterCookingId: 2,
        },
        {
          masterGenreId: 4,
          masterCookingId: 3,
        },
        {
          masterGenreId: 3,
          masterCookingId: 19,
        },
        {
          masterGenreId: 4,
          masterCookingId: 20,
        },
      ];
      await prisma.masterGenreMasterCooking.createMany({ data: genreCookingMocks });

      const response = await axios.post<PhotoGetResponse[]>("/api/photos/search", {
        master_prefecture_id: 0,
        master_area_id: 0,
        master_detailed_area_id: 0,
        master_railroad_station_id: 0,
        master_genre_id: 3,
        master_cooking_id: 0,
        price_min: 0,
        price_max: 0,
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      const photo1 = response.data.find((photo) => photo.id === shopPhotoMocks[0].id);
      expect(photo1?.path).toBe(shopPhotoMocks[0].path);
      expect(photo1?.menu_id).toBe(shopPhotoMocks[0].menuId);

      const photo2 = response.data.find((photo) => photo.id === shopPhotoMocks[2].id);
      expect(photo2?.path).toBe(shopPhotoMocks[2].path);
      expect(photo2?.menu_id).toBe(shopPhotoMocks[2].menuId);
    });

    it("search cooking should return 2 photos and 200 status", async () => {
      await masterAreaSeed(prisma);
      await masterDetailedAreaSeed(prisma);
      await masterRailroadStationSeed(prisma);
      await shopSeed(prisma);
      await masterGenreMasterCookingSeed(prisma);

      const menuMocks = [
        {
          id: 2,
          name: "かけそば",
          price: 400,
          masterCookingId: 2,
          shopId: 3,
        },
        {
          id: 3,
          name: "かけそば大盛り",
          price: 300,
          masterCookingId: 2,
          shopId: 3,
        },
        {
          id: 19,
          name: "わかめそば（温）",
          price: 280,
          masterCookingId: 19,
          shopId: 3,
        },
        {
          id: 20,
          name: "わかめうどん（温）",
          price: 280,
          masterCookingId: 20,
          shopId: 3,
        },
      ];
      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: 3,
        },
        {
          id: 19,
          path: "/images/sample/sample019.jpeg",
          menuId: 19,
        },
        {
          id: 20,
          path: "/images/sample/sample020.jpeg",
          menuId: 20,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const response = await axios.post<PhotoGetResponse[]>("/api/photos/search", {
        master_prefecture_id: 0,
        master_area_id: 0,
        master_detailed_area_id: 0,
        master_railroad_station_id: 0,
        master_genre_id: 0,
        master_cooking_id: 2,
        price_min: 0,
        price_max: 0,
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      const photo1 = response.data.find((photo) => photo.id === shopPhotoMocks[0].id);
      expect(photo1?.path).toBe(shopPhotoMocks[0].path);
      expect(photo1?.menu_id).toBe(shopPhotoMocks[0].menuId);

      const photo2 = response.data.find((photo) => photo.id === shopPhotoMocks[1].id);
      expect(photo2?.path).toBe(shopPhotoMocks[1].path);
      expect(photo2?.menu_id).toBe(shopPhotoMocks[1].menuId);
    });

    it("search price should return 2 photos and 200 status", async () => {
      await masterAreaSeed(prisma);
      await masterDetailedAreaSeed(prisma);
      await masterRailroadStationSeed(prisma);
      await masterGenreMasterCookingSeed(prisma);
      await shopSeed(prisma);

      const menuMocks = [
        {
          id: 2,
          name: "かけそば",
          price: 400,
          masterCookingId: 2,
          shopId: 3,
        },
        {
          id: 3,
          name: "かけそば大盛り",
          price: 300,
          masterCookingId: 2,
          shopId: 3,
        },
        {
          id: 19,
          name: "わかめそば（温）",
          price: 280,
          masterCookingId: 19,
          shopId: 3,
        },
        {
          id: 20,
          name: "わかめうどん（温）",
          price: 280,
          masterCookingId: 20,
          shopId: 3,
        },
      ];
      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: 3,
        },
        {
          id: 19,
          path: "/images/sample/sample019.jpeg",
          menuId: 19,
        },
        {
          id: 20,
          path: "/images/sample/sample020.jpeg",
          menuId: 20,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const response = await axios.post<PhotoGetResponse[]>("/api/photos/search", {
        master_prefecture_id: 0,
        master_area_id: 0,
        master_detailed_area_id: 0,
        master_railroad_station_id: 0,
        master_genre_id: 0,
        master_cooking_id: 0,
        price_min: 300,
        price_max: 400,
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      const photo1 = response.data.find((photo) => photo.id === shopPhotoMocks[0].id);
      expect(photo1?.path).toBe(shopPhotoMocks[0].path);
      expect(photo1?.menu_id).toBe(shopPhotoMocks[0].menuId);

      const photo2 = response.data.find((photo) => photo.id === shopPhotoMocks[1].id);
      expect(photo2?.path).toBe(shopPhotoMocks[1].path);
      expect(photo2?.menu_id).toBe(shopPhotoMocks[1].menuId);
    });

    it("search prefecture should return 2 photos and 200 status", async () => {
      await masterRailroadStationSeed(prisma);
      const areaMocks = [
        {
          id: 1,
          name: "札幌市",
          masterPrefectureId: 1,
        },
        {
          id: 2,
          name: "銀座・新橋・有楽町",
          masterPrefectureId: 8,
        },
      ];

      await prisma.masterArea.createMany({ data: areaMocks });

      const shopMocks = [
        {
          id: 1,
          name: "キッチンおかもと",
          address: "北海道札幌市1-1-1",
          tel: "03-1111-2222",
          openingTime: "11:00",
          closingTime: "14:00",
          masterAreaId: 1,
          masterDetailedAreaId: 0,
          masterRailroadStationId: 1132008,
          shopUserId: 1,
        },
        {
          id: 2,
          name: "フンチンハイ",
          address: "東京都大田区蒲田1-1-1",
          tel: "03-3333-4444",
          openingTime: "08:00",
          closingTime: "12:00",
          masterAreaId: 2,
          masterDetailedAreaId: 0,
          masterRailroadStationId: 1133230,
          shopUserId: 2,
        },
      ];
      await prisma.shop.createMany({ data: shopMocks });

      const menuMocks = [
        {
          id: 2,
          name: "かけそば",
          price: 400,
          masterCookingId: 2,
          shopId: 1,
        },
        {
          id: 3,
          name: "冷やしぶっかけうどん",
          price: 300,
          masterCookingId: 3,
          shopId: 1,
        },
        {
          id: 19,
          name: "わかめそば（温）",
          price: 280,
          masterCookingId: 19,
          shopId: 2,
        },
        {
          id: 20,
          name: "わかめうどん（温）",
          price: 280,
          masterCookingId: 20,
          shopId: 2,
        },
      ];

      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: 3,
        },
        {
          id: 19,
          path: "/images/sample/sample019.jpeg",
          menuId: 19,
        },
        {
          id: 20,
          path: "/images/sample/sample020.jpeg",
          menuId: 20,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const response = await axios.post<PhotoGetResponse[]>("/api/photos/search", {
        master_prefecture_id: 1,
        master_area_id: 0,
        master_detailed_area_id: 0,
        master_railroad_station_id: 0,
        master_genre_id: 0,
        master_cooking_id: 0,
        price_min: 0,
        price_max: 0,
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      const photo1 = response.data.find((photo) => photo.id === shopPhotoMocks[0].id);
      expect(photo1?.path).toBe(shopPhotoMocks[0].path);
      expect(photo1?.menu_id).toBe(shopPhotoMocks[0].menuId);

      const photo2 = response.data.find((photo) => photo.id === shopPhotoMocks[1].id);
      expect(photo2?.path).toBe(shopPhotoMocks[1].path);
      expect(photo2?.menu_id).toBe(shopPhotoMocks[1].menuId);
    });

    it("search detailed area should return 2 photos and 200 status", async () => {
      await masterRailroadStationSeed(prisma);
      await masterAreaSeed(prisma);

      const detailedAreaMocks = [
        {
          id: 1,
          name: "札幌市中央区",
          masterAreaId: 1,
        },
        {
          id: 11,
          name: "銀座",
          masterAreaId: 2,
        },
      ];

      await prisma.masterDetailedArea.createMany({ data: detailedAreaMocks });

      const shopMocks = [
        {
          id: 1,
          name: "キッチンおかもと",
          address: "北海道札幌市中央区1-1-1",
          tel: "03-1111-2222",
          openingTime: "11:00",
          closingTime: "14:00",
          masterAreaId: 1,
          masterDetailedAreaId: 1,
          masterRailroadStationId: 1132008,
          shopUserId: 1,
        },
        {
          id: 2,
          name: "フンチンハイ",
          address: "東京都大田区蒲田1-1-1",
          tel: "03-3333-4444",
          openingTime: "08:00",
          closingTime: "12:00",
          masterAreaId: 2,
          masterDetailedAreaId: 11,
          masterRailroadStationId: 1133230,
          shopUserId: 2,
        },
      ];
      await prisma.shop.createMany({ data: shopMocks });

      const menuMocks = [
        {
          id: 2,
          name: "かけそば",
          price: 400,
          masterCookingId: 2,
          shopId: 1,
        },
        {
          id: 3,
          name: "冷やしぶっかけうどん",
          price: 300,
          masterCookingId: 3,
          shopId: 1,
        },
        {
          id: 19,
          name: "わかめそば（温）",
          price: 280,
          masterCookingId: 19,
          shopId: 2,
        },
        {
          id: 20,
          name: "わかめうどん（温）",
          price: 280,
          masterCookingId: 20,
          shopId: 2,
        },
      ];

      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: 3,
        },
        {
          id: 19,
          path: "/images/sample/sample019.jpeg",
          menuId: 19,
        },
        {
          id: 20,
          path: "/images/sample/sample020.jpeg",
          menuId: 20,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const response = await axios.post<PhotoGetResponse[]>("/api/photos/search", {
        master_prefecture_id: 0,
        master_area_id: 0,
        master_detailed_area_id: 1,
        master_railroad_station_id: 0,
        master_genre_id: 0,
        master_cooking_id: 0,
        price_min: 0,
        price_max: 0,
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      const photo1 = response.data.find((photo) => photo.id === shopPhotoMocks[0].id);
      expect(photo1?.path).toBe(shopPhotoMocks[0].path);
      expect(photo1?.menu_id).toBe(shopPhotoMocks[0].menuId);

      const photo2 = response.data.find((photo) => photo.id === shopPhotoMocks[1].id);
      expect(photo2?.path).toBe(shopPhotoMocks[1].path);
      expect(photo2?.menu_id).toBe(shopPhotoMocks[1].menuId);
    });

    it("search railroad station should return 2 photos and 200 status", async () => {
      await masterRailroadStationSeed(prisma);
      await masterAreaSeed(prisma);
      await masterDetailedAreaSeed(prisma);

      const shopMocks = [
        {
          id: 1,
          name: "キッチンおかもと",
          address: "北海道札幌市中央区1-1-1",
          tel: "03-1111-2222",
          openingTime: "11:00",
          closingTime: "14:00",
          masterAreaId: 1,
          masterDetailedAreaId: 0,
          masterRailroadStationId: 1132008,
          shopUserId: 1,
        },
        {
          id: 2,
          name: "フンチンハイ",
          address: "東京都大田区蒲田1-1-1",
          tel: "03-3333-4444",
          openingTime: "08:00",
          closingTime: "12:00",
          masterAreaId: 2,
          masterDetailedAreaId: 0,
          masterRailroadStationId: 1133230,
          shopUserId: 2,
        },
      ];
      await prisma.shop.createMany({ data: shopMocks });

      const menuMocks = [
        {
          id: 2,
          name: "かけそば",
          price: 400,
          masterCookingId: 2,
          shopId: 1,
        },
        {
          id: 3,
          name: "冷やしぶっかけうどん",
          price: 300,
          masterCookingId: 3,
          shopId: 1,
        },
        {
          id: 19,
          name: "わかめそば（温）",
          price: 280,
          masterCookingId: 19,
          shopId: 2,
        },
        {
          id: 20,
          name: "わかめうどん（温）",
          price: 280,
          masterCookingId: 20,
          shopId: 2,
        },
      ];

      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: 3,
        },
        {
          id: 19,
          path: "/images/sample/sample019.jpeg",
          menuId: 19,
        },
        {
          id: 20,
          path: "/images/sample/sample020.jpeg",
          menuId: 20,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const response = await axios.post<PhotoGetResponse[]>("/api/photos/search", {
        master_prefecture_id: 0,
        master_area_id: 0,
        master_detailed_area_id: 0,
        master_railroad_station_id: 1132008,
        master_genre_id: 0,
        master_cooking_id: 0,
        price_min: 0,
        price_max: 0,
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      const photo1 = response.data.find((photo) => photo.id === shopPhotoMocks[0].id);
      expect(photo1?.path).toBe(shopPhotoMocks[0].path);
      expect(photo1?.menu_id).toBe(shopPhotoMocks[0].menuId);

      const photo2 = response.data.find((photo) => photo.id === shopPhotoMocks[1].id);
      expect(photo2?.path).toBe(shopPhotoMocks[1].path);
      expect(photo2?.menu_id).toBe(shopPhotoMocks[1].menuId);
    });
  });
});
