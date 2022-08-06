import { Connection, RowDataPacket } from "mysql2/promise";
import { DetailedAreaRepository } from "../../../repositories/detailedArea/detailedAreaRepository";
import { NotFoundDataError } from "../../../utils/error";
import { createDBConnection } from "../../utils/Database/database";
import { createDetailedAreaTestData } from "../../utils/testData/createDetailedAreaTestData";

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`SET foreign_key_checks = 0;`);
  connection.query(`delete from master_prefectures`);
  connection.query(`delete from master_areas`);
  connection.query(`delete from master_detailed_areas`);
});

afterEach(async () => {
  await connection.end();
});

describe("DetailedAreaRepository", () => {
  describe("findAll", () => {
    it("shoud return 20 detailedAreas", async () => {
      const repository = new DetailedAreaRepository(connection);
      const createdDetailedAreaList = await createDetailedAreaTestData(connection, 2, 2, 5);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(20);

      for (const detailedArea of result) {
        const expectDetailedArea = createdDetailedAreaList.filter((t) => t.id === detailedArea.id)[0];
        expect(detailedArea.id).toBe(expectDetailedArea.id);
        expect(detailedArea.name).toBe(expectDetailedArea.name);
        expect(detailedArea.master_area_id).toBe(expectDetailedArea.master_area_id);
      }
    });
    it("shoud return empty", async () => {
      const repository = new DetailedAreaRepository(connection);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }
      expect(result.length).toBe(0);
    });
  });
  describe("getByAreaId", () => {
    it("shoud return 5 detailed_areas", async () => {
      const repository = new DetailedAreaRepository(connection);
      const createdDetailedAreaList = await createDetailedAreaTestData(connection, 2, 2, 5);

      const result = await repository.getByAreaId(createdDetailedAreaList[0].master_area_id);
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(5);

      for (const detailedArea of result) {
        const expectDetailedArea = createdDetailedAreaList.filter((t) => t.id === detailedArea.id)[0];
        expect(detailedArea.id).toBe(expectDetailedArea.id);
        expect(detailedArea.name).toBe(expectDetailedArea.name);
        expect(detailedArea.master_area_id).toBe(expectDetailedArea.master_area_id);
      }
    });

    it("shoud return notfound error", async () => {
      const repository = new DetailedAreaRepository(connection);
      const result = await repository.getByAreaId(1);
      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result instanceof NotFoundDataError).toBeTruthy();
    });
  });
});
