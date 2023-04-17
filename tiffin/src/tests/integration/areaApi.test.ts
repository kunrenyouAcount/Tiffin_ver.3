import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterPrefectureSeed } from "../../../prisma/seed";
import { AreaGetResponse } from "../../models/api/area/get/response";

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
});

afterEach(async () => {
  await prisma.$disconnect();
});

describe("API areas", () => {
  describe("GET /areas", () => {
    it("should return 2 areas and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          name: "札幌市",
          masterPrefectureId: 1,
        },
        {
          id: 2,
          name: "旭川・富良野・士別",
          masterPrefectureId: 1,
        },
      ];
      await prisma.masterArea.createMany({ data: mocks });

      const response = await axios.get<AreaGetResponse[]>("/api/areas");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const area = mocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(area!.name);
        expect(result.master_prefecture_id).toBe(area!.masterPrefectureId);
      }
    });
  });

  describe("GET /areas/prefecture-id/:prefectureId", () => {
    it("should return areas and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          name: "札幌市",
          masterPrefectureId: 1,
        },
        {
          id: 2,
          name: "旭川・富良野・士別",
          masterPrefectureId: 1,
        },
        {
          id: 3,
          name: "青森・東津軽・八甲田山",
          masterPrefectureId: 2,
        },
      ];
      await prisma.masterArea.createMany({ data: mocks });

      const response = await axios.get<AreaGetResponse[]>(`/api/areas/prefecture-id/${mocks[0].masterPrefectureId}}`);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const area = mocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(area!.name);
        expect(result.master_prefecture_id).toBe(area!.masterPrefectureId);
      }
    });
    it("should return 404 status", async () => {
      const notExistsId = 100;
      const response = await axios.get<AreaGetResponse[]>(`/api/areas/prefecture-id/${notExistsId}`);
      expect(response.status).toBe(404);
    });
  });
});
