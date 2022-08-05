import { Connection, RowDataPacket } from "mysql2/promise";
import { AreaRepository } from "../../../repositories/area/areaRepository";
import { NotFoundDataError } from "../../../utils/error";
import { createDBConnection } from "../../utils/Database/database";
import { createAreaTestData } from "../../utils/testData/createAreaTestData";

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`SET foreign_key_checks = 0;`);
  connection.query(`delete from master_prefectures`);
  connection.query(`delete from master_areas`);
});

afterEach(async () => {
  await connection.end();
});

describe("AreaRepository", () => {
  describe("findAll", () => {
    it("shoud return 10 areas", async () => {
      const repository = new AreaRepository(connection);
      const createdAreaList = await createAreaTestData(connection, 2, 5);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(10);

      for (const area of result) {
        const expectArea = createdAreaList.filter((t) => t.id === area.id)[0];
        expect(area.id).toBe(expectArea.id);
        expect(area.name).toBe(expectArea.name);
        expect(area.master_prefecture_id).toBe(expectArea.master_prefecture_id);
      }
    });
    it("shoud return empty", async () => {
      const repository = new AreaRepository(connection);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }
      expect(result.length).toBe(0);
    });
  });
  describe("getByPrefectureId", () => {
    it("shoud return 5 areas", async () => {
      const repository = new AreaRepository(connection);
      const createdAreaList = await createAreaTestData(connection, 2, 5);

      const result = await repository.getByPrefectureId(createdAreaList[0].master_prefecture_id);
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.length).toBe(5);

      for (const area of result) {
        const expectArea = createdAreaList.filter((t) => t.id === area.id)[0];
        expect(area.id).toBe(expectArea.id);
        expect(area.name).toBe(expectArea.name);
        expect(area.master_prefecture_id).toBe(expectArea.master_prefecture_id);
      }
    });

    it("shoud return notfound error", async () => {
      const repository = new AreaRepository(connection);
      const result = await repository.getByPrefectureId(1);
      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result instanceof NotFoundDataError).toBeTruthy();
    });
  });
});
