import axios from "axios";
import * as dotenv from "dotenv";
import { Connection, RowDataPacket } from "mysql2/promise";
import { AreaResponse } from "../../controllers/area/response";
import { createDBConnection } from "../utils/Database/database";
import { createAreaTestData } from "../utils/testData/createAreaTestData";
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
});

afterEach(async () => {
  await connection.end();
});

describe("AreaApi", () => {
  describe("findAll", () => {
    it("should return 10 areas and 200 status", async () => {
      const token = await createTokenTestData(connection);
      const createdAreaList = await createAreaTestData(connection, 2, 5);

      const response = await axios.get<AreaResponse[]>("/api/areas", { headers: { Authorization: token } });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(10);

      for (const areaMaster of response.data) {
        const expectArea = createdAreaList.filter((t) => t.id === areaMaster.id)[0];
        expect(areaMaster.id).toBe(expectArea.id);
        expect(areaMaster.name).toBe(expectArea.name);
      }
    });
  });
  describe("getByPrefectureId", () => {
    it("should return 5 areas and 200 status", async () => {
      const token = await createTokenTestData(connection);
      const createdAreaList = await createAreaTestData(connection, 2, 5);
      const expectArea = createdAreaList[0];
      const response = await axios.get<AreaResponse[]>(`/api/areas/prefecture-id/${expectArea.master_prefecture_id}`, {
        headers: { Authorization: token },
      });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);

      for (const areaMaster of response.data) {
        const expectArea = createdAreaList.filter((t) => t.id === areaMaster.id)[0];
        expect(areaMaster.id).toBe(expectArea.id);
        expect(areaMaster.name).toBe(expectArea.name);
      }
    });
    it("should return 404 status", async () => {
      const token = await createTokenTestData(connection);
      const notExistsId = 1;
      const response = await axios.get<AreaResponse[]>(`/api/areas/prefecture-id/${notExistsId}`, {
        headers: { Authorization: token },
      });
      expect(response.status).toBe(404);
    });
  });
});
