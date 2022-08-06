import { Connection, RowDataPacket } from "mysql2/promise";
import { PrefectureRepository } from "../../../repositories/prefecture/prefectureRepository";
import { NotFoundDataError } from "../../../utils/error";
import { createDBConnection } from "../../utils/Database/database";
import { createPrefectureTestData } from "../../utils/testData/createPrefectureTestData";

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`SET foreign_key_checks = 0;`);
  connection.query(`delete from master_prefectures`);
});

afterEach(async () => {
  await connection.end();
});

describe("PrefectureRepository", () => {
  describe("findAll", () => {
    it("shoud return 5 prefecture", async () => {
      const repository = new PrefectureRepository(connection);
      const createdPrefectureList = await createPrefectureTestData(connection, 5);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      for (const prefecture of result) {
        const expectPrefecture = createdPrefectureList.filter((t) => t.id === prefecture.id)[0];
        expect(prefecture.id).toBe(expectPrefecture.id);
        expect(prefecture.name).toBe(expectPrefecture.name);
      }
    });
    it("shoud return empty", async () => {
      const repository = new PrefectureRepository(connection);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }
      expect(result.length).toBe(0);
    });
  });
  describe("getById", () => {
    it("shoud return 5 prefecture", async () => {
      const repository = new PrefectureRepository(connection);
      const [prefecture] = await createPrefectureTestData(connection, 1);

      const result = await repository.getById(prefecture.id!);
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      expect(result.id).toBe(prefecture.id);
      expect(result.name).toBe(prefecture.name);
    });

    it("shoud return notfound error", async () => {
      const repository = new PrefectureRepository(connection);
      const result = await repository.getById(1);
      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result instanceof NotFoundDataError).toBeTruthy();
    });
  });
});
