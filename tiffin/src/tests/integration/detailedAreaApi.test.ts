import axios from "axios";
import * as dotenv from "dotenv";
import { Connection, RowDataPacket } from "mysql2/promise";
import { DetailedAreaResponse } from "../../controllers/detailedArea/response";
import { createDBConnection } from "../utils/Database/database";
import { createDetailedAreaTestData } from "../utils/testData/createDetailedAreaTestData";
import { createTokenTestData } from "../utils/testData/createTokenTestData";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`SET foreign_key_checks = 0;`);
  connection.query(`delete from users`);
  connection.query(`delete from master_prefectures`);
  connection.query(`delete from master_areas`);
  connection.query(`delete from master_detailed_areas`);
});

afterEach(async () => {
  await connection.end();
});

describe("DetailedAreaApi", () => {
  describe("findAll", () => {
    it("should return 20 detailedAreas and 200 status", async () => {
      const token = await createTokenTestData(connection);
      const createdDetailedAreaList = await createDetailedAreaTestData(connection, 2, 2, 5);

      const response = await axios.get<DetailedAreaResponse[]>("/api/detailed-areas", {
        headers: { Authorization: token },
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(20);

      for (const detailedAreaMaster of response.data) {
        const expectDetailedArea = createdDetailedAreaList.filter((t) => t.id === detailedAreaMaster.id)[0];
        expect(detailedAreaMaster.id).toBe(expectDetailedArea.id);
        expect(detailedAreaMaster.name).toBe(expectDetailedArea.name);
      }
    });
  });
  describe("getByAreaId", () => {
    it("should return 5 detailedAreas and 200 status", async () => {
      const token = await createTokenTestData(connection);
      const createdDetailedAreaList = await createDetailedAreaTestData(connection, 2, 2, 5);
      const expectDetailedArea = createdDetailedAreaList[0];
      const response = await axios.get<DetailedAreaResponse[]>(
        `/api/detailed-areas/area-id/${expectDetailedArea.master_area_id}`,
        { headers: { Authorization: token } }
      );

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);

      for (const detailedAreaMaster of response.data) {
        const expectDetailedArea = createdDetailedAreaList.filter((t) => t.id === detailedAreaMaster.id)[0];
        expect(detailedAreaMaster.id).toBe(expectDetailedArea.id);
        expect(detailedAreaMaster.name).toBe(expectDetailedArea.name);
      }
    });
    it("should return 404 status", async () => {
      const token = await createTokenTestData(connection);
      const notExistsId = 1;
      const response = await axios.get<DetailedAreaResponse[]>(`/api/detailed-areas/area-id/${notExistsId}`, {
        headers: { Authorization: token },
      });
      expect(response.status).toBe(404);
    });
  });
});
