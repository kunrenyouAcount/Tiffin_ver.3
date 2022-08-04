import axios from "axios";
import * as dotenv from "dotenv";
import { Connection, RowDataPacket } from "mysql2/promise";
import { RailroadStationResponse } from "../../controllers/railroadStation/response";
import { createDBConnection } from "../utils/Database/database";
import { createRailroadStationTestData } from "../utils/testData/createRailroadStationTestData";

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
  connection.query(`delete from master_railroad_stations`);
});

afterEach(async () => {
  await connection.end();
});

describe("RailroadStationApi", () => {
  describe("findAll", () => {
    it("should return 10 railroadStations and 200 status", async () => {
      const createdRailroadStationList = await createRailroadStationTestData(connection, 2, 5);

      const response = await axios.get<RailroadStationResponse[]>("/api/railroad-stations");

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(10);

      for (const railroadStationMaster of response.data) {
        const expectRailroadStation = createdRailroadStationList.filter((t) => t.id === railroadStationMaster.id)[0];
        expect(railroadStationMaster.id).toBe(expectRailroadStation.id);
        expect(railroadStationMaster.name).toBe(expectRailroadStation.name);
      }
    });
  });
  describe("getByPrefectureId", () => {
    it("should return 5 railroadStations and 200 status", async () => {
      const createdRailroadStationList = await createRailroadStationTestData(connection, 2, 5);
      const expectRailroadStation = createdRailroadStationList[0];
      const response = await axios.get<RailroadStationResponse[]>(
        `/api/railroad-stations/prefecture-id/${expectRailroadStation.master_prefecture_id}`
      );

      expect(response.status).toBe(200);
      expect(response.data.length).toBe(5);

      for (const railroadStationMaster of response.data) {
        const expectRailroadStation = createdRailroadStationList.filter((t) => t.id === railroadStationMaster.id)[0];
        expect(railroadStationMaster.id).toBe(expectRailroadStation.id);
        expect(railroadStationMaster.name).toBe(expectRailroadStation.name);
      }
    });
    it("should return 404 status", async () => {
      const notExistsId = 1;
      const response = await axios.get<RailroadStationResponse[]>(
        `/api/railroad-stations/prefecture-id/${notExistsId}`
      );
      expect(response.status).toBe(404);
    });
  });
});
