import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../../utils/allTableTruncate";
import { CookingGetResponse } from "../../../models/api/cooking/get/response";
import { masterGenreSeed } from "../../../../prisma/seed";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let prisma = new PrismaClient();

beforeEach(async () => {
  const prisma = new PrismaClient();
  await truncate(prisma);
  await masterGenreSeed(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("API cookings", () => {
  describe("GET /cookings", () => {
    it("should return 2 cookings and 200 status", async () => {
      const mocks = [
        {
          id: 1,
          name: "和食",
        },
        {
          id: 2,
          name: "洋食",
        },
      ];
      await prisma.masterCooking.createMany({ data: mocks });
      const response = await axios.get<CookingGetResponse[]>("/api/cookings");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const cooking = mocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(cooking!.name);
      }
    });
  });

  describe("GET /cookings/genre-id/:genreId", () => {
    it("should return cookings and 200 status", async () => {
      const mockCookings = [
        {
          id: 1,
          name: "うな丼・うな重",
        },
        {
          id: 2,
          name: "かけそば",
        },
        {
          id: 3,
          name: "かけうどん",
        },
      ];
      await prisma.masterCooking.createMany({ data: mockCookings });

      const mockGenreCookings = [
        {
          masterGenreId: 1,
          masterCookingId: mockCookings[0].id,
        },
        {
          masterGenreId: 1,
          masterCookingId: mockCookings[1].id,
        },
        {
          masterGenreId: 2,
          masterCookingId: mockCookings[2].id,
        },
      ];
      await prisma.masterGenreMasterCooking.createMany({ data: mockGenreCookings });

      const response = await axios.get<CookingGetResponse[]>(`/api/cookings/genre-id/1}`);

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const cooking = mockCookings.find((mock) => mock.id === result.id);
        expect(result.name).toBe(cooking!.name);
      }
    });
    it("should return 404 status", async () => {
      const notExistsId = 1000;
      const response = await axios.get<CookingGetResponse[]>(`/api/detailed-genres/genre-id/${notExistsId}`);
      expect(response.status).toBe(404);
    });
  });
});
