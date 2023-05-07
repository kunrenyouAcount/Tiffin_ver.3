import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../../utils/allTableTruncate";
import { GenreGetResponse } from "../../../models/api/genre/get/response";

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

describe("API genres", () => {
  describe("GET /genres", () => {
    it("should return 2 genres and 200 status", async () => {
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
      await prisma.masterGenre.createMany({ data: mocks });
      const response = await axios.get<GenreGetResponse[]>("/api/genres");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(2);

      for (const result of response.data) {
        const genre = mocks.find((mock) => mock.id === result.id);
        expect(result.name).toBe(genre!.name);
      }
    });
  });
});
