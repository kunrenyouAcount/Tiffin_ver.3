import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterPrefectureSeed, masterRailroadStationSeed } from "../../../prisma/seed";
import { RailroadStationGetResponse } from "../../models/api/railroadStation/get/response";

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

describe("GET /railroad-stations", () => {
  it("should return 2 railroad-stations and 200 status", async () => {
    const mocks = [
      {
        id: 1110101,
        name: "函館",
        postCode: "040-0063",
        address: "北海道函館市若松町１２-１３",
        status: 0,
        masterPrefectureId: 1,
      },
      {
        id: 1110102,
        name: "五稜郭",
        postCode: "041-0813",
        address: "函館市亀田本町",
        status: 0,
        masterPrefectureId: 1,
      },
    ];
    await prisma.masterRailroadStation.createMany({ data: mocks });

    const response = await axios.get<RailroadStationGetResponse[]>("/api/railroad-stations");

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(2);

    for (const result of response.data) {
      const railroadStation = mocks.find((mock) => mock.id === result.id);
      expect(result.name).toBe(railroadStation!.name);
    }
  });
});

describe("GET /railroad-stations/prefecture-id/:prefectureId", () => {
  it("should return railroad-stations and 200 status", async () => {
    const mocks = [
      {
        id: 1110101,
        name: "函館",
        postCode: "040-0063",
        address: "北海道函館市若松町１２-１３",
        status: 0,
        masterPrefectureId: 1,
      },
      {
        id: 1110102,
        name: "五稜郭",
        postCode: "041-0813",
        address: "函館市亀田本町",
        status: 0,
        masterPrefectureId: 1,
      },
      {
        id: 1120101,
        name: "八戸",
        postCode: "039-1101",
        address: "八戸市尻内町",
        status: 2,
        masterPrefectureId: 2,
      },
    ];
    await prisma.masterRailroadStation.createMany({ data: mocks });

    const response = await axios.get<RailroadStationGetResponse[]>(
      `/api/railroad-stations/prefecture-id/${mocks[0].masterPrefectureId}}`
    );

    expect(response.status).toBe(200);
    expect(response.data.length).toBe(2);

    for (const result of response.data) {
      const railroadStation = mocks.find((mock) => mock.id === result.id);
      expect(result.name).toBe(railroadStation!.name);
    }
  });
  it("should return 404 status", async () => {
    const notExistsId = 100;
    const response = await axios.get<RailroadStationGetResponse[]>(
      `/api/railroad-stations/prefecture-id/${notExistsId}`
    );
    expect(response.status).toBe(404);
  });
});
