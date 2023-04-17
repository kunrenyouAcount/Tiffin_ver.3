import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { PrefectureGetResponse } from "../../models/api/prefecture/get/response";

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
  await prisma.$disconnect();
});

describe("API prefectures", () => {
  describe("GET /prefectures", () => {
    it("should return 2 prefectures and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          name: "北海道",
        },
        {
          id: 2,
          name: "青森県",
        },
      ];
      await prisma.masterPrefecture.createMany({ data: mocks });
      const response = await axios.get<PrefectureGetResponse[]>("/api/prefectures");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const prefecture = mocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(prefecture!.name);
      }
    });
  });

  describe("GET /prefectures/:id", () => {
    it("should return a prefecture and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          name: "北海道",
        },
        {
          id: 2,
          name: "青森県",
        },
      ];
      await prisma.masterPrefecture.createMany({ data: mocks });
      const response = await axios.get<PrefectureGetResponse>(`/api/prefectures/${mocks[0].id}`);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(mocks[0].id);
      expect(response.data.name).toBe(mocks[0].name);
    });
    it("should return 404 status", async () => {
      const notExistsId = 100;
      const response = await axios.get<PrefectureGetResponse>(`/api/prefectures/${notExistsId}`);
      expect(response.status).toBe(404);
    });
  });
});
