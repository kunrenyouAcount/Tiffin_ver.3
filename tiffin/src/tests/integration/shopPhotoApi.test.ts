import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterSeed, menuSeed, shopSeed, shopUserSeed } from "../../../prisma/seed";
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
  await masterSeed(prisma);
  await shopUserSeed(prisma);
  await shopSeed(prisma);
  await menuSeed(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("API photos", () => {
  describe("GET /photos", () => {
    it("should return 2 photos and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          path: "/images/sample/sample001.jpeg",
          menuId: 1,
        },
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
      ];
      await prisma.shopPhoto.createMany({ data: mocks });
      const response = await axios.get<PhotoGetResponse[]>("/api/photos");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const photo = mocks.find((mock) => mock.id === result.id);
        expect(result.path).toBe(photo!.path);
        expect(result.menu_id).toBe(photo!.menuId);
      }
    });
  });

  describe("GET /photos/:id", () => {
    it("should return a photo and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          path: "/images/sample/sample001.jpeg",
          menuId: 1,
        },
        {
          id: 2,
          path: "/images/sample/sample002.jpeg",
          menuId: 2,
        },
      ];
      await prisma.shopPhoto.createMany({ data: mocks });
      const response = await axios.get<PhotoGetResponse>(`/api/photos/${mocks[0].id}`);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(mocks[0].id);
      expect(response.data.path).toBe(mocks[0].path);
      expect(response.data.menu_id).toBe(mocks[0].menuId);
    });
    it("should return 404 status", async () => {
      const notExistsId = 100;
      const response = await axios.get<PhotoGetResponse>(`/api/photos/${notExistsId}`);
      expect(response.status).toBe(404);
    });
  });
});
