import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterAreaSeed, masterPrefectureSeed } from "../../../prisma/seed";
import { DetailedAreaGetResponse } from "../../models/api/detailedArea/get/response";

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
  await masterAreaSeed(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("GET /detailed-areas", () => {
  it("should return 2 detailed-areas and 200 status", async () => {
    const mocks = [
      {
        id: 1,
        name: "函館",
        masterAreaId: 3,
      },
      {
        id: 2,
        name: "青森市",
        masterAreaId: 10,
      },
    ];
    await prisma.masterDetailedArea.createMany({ data: mocks });

    const response = await axios.get<DetailedAreaGetResponse[]>("/api/detailed-areas");

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(2);

    for (const result of response.data) {
      const detailedArea = mocks.find((mock) => mock.id === result.id);
      expect(result.name).toBe(detailedArea!.name);
    }
  });
});

describe("GET /detailed-areas/area-id/:areaId", () => {
  it("should return detailed-areas and 200 status", async () => {
    const mocks = [
      {
        id: 3,
        name: "盛岡",
        masterAreaId: 18,
      },
      {
        id: 4,
        name: "銀座",
        masterAreaId: 39,
      },
      {
        id: 5,
        name: "有楽町・日比谷",
        masterAreaId: 39,
      },
    ];
    await prisma.masterDetailedArea.createMany({ data: mocks });

    const response = await axios.get<DetailedAreaGetResponse[]>(
      `/api/detailed-areas/area-id/${mocks[1].masterAreaId}}`
    );

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(2);

    for (const result of response.data) {
      const detailedArea = mocks.find((mock) => mock.id === result.id);
      expect(result.name).toBe(detailedArea!.name);
    }
  });
  it("should return 404 status", async () => {
    const notExistsId = 1000;
    const response = await axios.get<DetailedAreaGetResponse[]>(`/api/detailed-areas/area-id/${notExistsId}`);
    expect(response.status).toBe(404);
  });
});
