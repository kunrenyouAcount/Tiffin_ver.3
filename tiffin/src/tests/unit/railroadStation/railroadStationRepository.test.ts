import { Connection, RowDataPacket } from "mysql2/promise";
import { RailroadStationRepository } from "../../../repositories/railroadStation/railroadStationRepository";
import { NotFoundDataError } from "../../../utils/error";
import { createDBConnection } from "../../utils/Database/database";
import { createRailroadStationTestData } from "../../utils/testData/createRailroadStationTestData";

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

describe("RailroadStationRepository", () => {
  describe("findAll", () => {
    it("shoud return 10 railroadStations", async () => {
      const repository = new RailroadStationRepository(connection);
      const createdRailroadStationList = await createRailroadStationTestData(connection, 2, 5);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(10);

      for (const railroadStation of result) {
        const expectRailroadStation = createdRailroadStationList.filter((t) => t.id === railroadStation.id)[0];
        expect(railroadStation.id).toBe(expectRailroadStation.id);
        expect(railroadStation.name).toBe(expectRailroadStation.name);
        expect(railroadStation.master_prefecture_id).toBe(expectRailroadStation.master_prefecture_id);
      }
    });
    it("shoud return empty", async () => {
      const repository = new RailroadStationRepository(connection);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }
      expect(result.length).toBe(0);
    });
  });
  describe("getByPrefectureId", () => {
    it("shoud return 5 railroadStations", async () => {
      const repository = new RailroadStationRepository(connection);
      const createdRailroadStationList = await createRailroadStationTestData(connection, 2, 5);

      const result = await repository.getByPrefectureId(createdRailroadStationList[0].master_prefecture_id);
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(5);

      for (const railroadStation of result) {
        const expectRailroadStation = createdRailroadStationList.filter((t) => t.id === railroadStation.id)[0];
        expect(railroadStation.id).toBe(expectRailroadStation.id);
        expect(railroadStation.name).toBe(expectRailroadStation.name);
        expect(railroadStation.master_prefecture_id).toBe(expectRailroadStation.master_prefecture_id);
      }
    });

    it("shoud return notfound error", async () => {
      const repository = new RailroadStationRepository(connection);
      const result = await repository.getByPrefectureId(1);
      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result instanceof NotFoundDataError).toBeTruthy();
    });
  });
});
