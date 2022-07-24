import axios from "axios";
import * as dotenv from "dotenv";
import { Connection, RowDataPacket } from "mysql2/promise";
import { MasterPrefecture } from "../../../src/models/masterPrefecture";
import { createDBConnection } from "../utils/Database/database";
import { createMasterPrefectureTestData } from "../utils/testData/createMasterPrefectureTestData";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`SET foreign_key_checks = 0;`);
  connection.query(`delete from master_prefectures`);
});

afterEach(async () => {
  await connection.end();
});

describe("MasterPrefectureApi", () => {
  describe("findAll", () => {
    it("should return 5 prefectures and 200 status", async () => {
      const createdMasterPrefectureList = await createMasterPrefectureTestData(connection, 5);

      const response = await axios.get<MasterPrefecture[]>("/master-prefectures");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);

      for (const prefectureMaster of response.data) {
        const expectMasterPrefecture = createdMasterPrefectureList.filter((t) => t.id === prefectureMaster.id)[0];
        expect(prefectureMaster.id).toBe(expectMasterPrefecture.id);
        expect(prefectureMaster.name).toBe(expectMasterPrefecture.name);
      }
    });
  });
});
