import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterSeed, menuSeed, shopPhotoSeed, shopSeed, shopUserSeed } from "../../../prisma/seed";
import { ModalItemGetResponse } from "../../models/api/modal/getModalItem/response";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let prisma = new PrismaClient();

beforeEach(async () => {
  const prisma = new PrismaClient();
  await truncate(prisma);
  await masterSeed(prisma);
  await shopUserSeed(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("API modals", () => {
  describe("GET /modal/menu-id/:menuId", () => {
    it("should return 2 modals and 200 status", async () => {
      const shopMocks = [
        {
          id: 1,
          name: "店舗１",
          address: "東京都新宿区歌舞伎町1-1-1",
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
          masterAreaId: 53,
          masterDetailedAreaId: 44,
          masterRailroadStationId: 1133230,
          shopUserId: 2,
        },
      ];
      await prisma.shop.createMany({ data: shopMocks });

      const menuMocks = [
        {
          id: 1,
          name: "うな重（松）",
          price: 4500,
          masterCookingId: 1,
          shopId: shopMocks[0].id,
        },
        {
          id: 2,
          name: "豚肉の塩レモン焼きそば",
          price: 560,
          masterCookingId: 4,
          shopId: shopMocks[0].id,
        },
        {
          id: 3,
          name: "餃子（30ケ）",
          price: 1200,
          masterCookingId: 11,
          shopId: shopMocks[1].id,
        },
      ];
      await prisma.menu.createMany({ data: menuMocks });

      const shopPhotoMocks = [
        {
          id: 1,
          path: "/images/sample/sample001.jpeg",
          menuId: menuMocks[0].id,
        },
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: menuMocks[1].id,
        },
        {
          id: 3,
          path: "/images/sample/sample003.jpeg",
          menuId: menuMocks[2].id,
        },
      ];
      await prisma.shopPhoto.createMany({ data: shopPhotoMocks });

      const response = await axios.get<ModalItemGetResponse>(`/api/modal/menu-id/${menuMocks[0].id}`);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(menuMocks[0].id);
      expect(response.data.name).toBe(menuMocks[0].name);
      expect(response.data.price).toBe(menuMocks[0].price);

      response.data.shopPhoto.forEach((resultShopPhoto) => {
        const mockShopPhoto = shopPhotoMocks.find((mock) => mock.id === resultShopPhoto.id);
        expect(resultShopPhoto.path).toBe(mockShopPhoto!.path);
      });

      expect(response.data.shop.id).toBe(shopMocks[0].id);
      expect(response.data.shop.name).toBe(shopMocks[0].name);
      expect(response.data.shop.address).toBe(shopMocks[0].address);
      expect(response.data.shop.tel).toBe(shopMocks[0].tel);
      expect(response.data.shop.opening_time).toBe(shopMocks[0].openingTime);
      expect(response.data.shop.closing_time).toBe(shopMocks[0].closingTime);
      expect(response.data.shop.name).toBe(shopMocks[0].name);

      response.data.shop.other_menus.forEach((resultOtherMenu) => {
        const mockOtherMenu = menuMocks.find((mock) => mock.id === resultOtherMenu.id);
        expect(resultOtherMenu.id).toBe(mockOtherMenu!.id);
        expect(resultOtherMenu.name).toBe(mockOtherMenu!.name);
        expect(resultOtherMenu.price).toBe(mockOtherMenu!.price);
        resultOtherMenu.shopPhoto.map((resultOtherMenuShopPhoto) => {
          const mockOtherMenuShopPhoto = shopPhotoMocks.find((mock) => mock.id === resultOtherMenuShopPhoto.id);
          expect(resultOtherMenuShopPhoto.path).toBe(mockOtherMenuShopPhoto!.path);
        });
      });
    });
    it("should return 404 status", async () => {
      const notExistsId = 100;
      const response = await axios.get<ModalItemGetResponse>(`/api/modal/menu-id/${notExistsId}`);
      expect(response.status).toBe(404);
    });
  });
});
