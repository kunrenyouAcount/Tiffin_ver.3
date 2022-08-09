import axios from "axios";
import * as dotenv from "dotenv";
import { Connection, RowDataPacket } from "mysql2/promise";
import { Prefecture } from "../../models/prefecture";
import { createDBConnection } from "../utils/Database/database";
import { createPrefectureTestData } from "../utils/testData/createPrefectureTestData";
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
});

afterEach(async () => {
  await connection.end();
});

describe("PrefectureApi", () => {
  describe("findAll", () => {
    it("should return 5 prefectures and 200 status", async () => {
      const token = await createTokenTestData(connection);
      const createdPrefectureList = await createPrefectureTestData(connection, 5);

      const response = await axios.get<Prefecture[]>("/api/prefectures", { headers: { Authorization: token } });

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);

      for (const prefectureMaster of response.data) {
        const expectPrefecture = createdPrefectureList.filter((t) => t.id === prefectureMaster.id)[0];
        expect(prefectureMaster.id).toBe(expectPrefecture.id);
        expect(prefectureMaster.name).toBe(expectPrefecture.name);
      }
    });
  });
  describe("getById", () => {
    it("should return prefecture and 200 status", async () => {
      const token = await createTokenTestData(connection);
      const createdPrefectureList = await createPrefectureTestData(connection, 1);
      const expectPrefecture = createdPrefectureList[0];
      const response = await axios.get<Prefecture>(`/api/prefectures/${expectPrefecture.id}`, {
        headers: { Authorization: token },
      });

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(expectPrefecture.id);
      expect(response.data.name).toBe(expectPrefecture.name);
    });
    it("should return 404 status", async () => {
      const token = await createTokenTestData(connection);
      const notExistsId = 1;
      const response = await axios.get<Prefecture>(`/api/prefectures/${notExistsId}`, {
        headers: { Authorization: token },
      });
      expect(response.status).toBe(404);
    });
  });
});
