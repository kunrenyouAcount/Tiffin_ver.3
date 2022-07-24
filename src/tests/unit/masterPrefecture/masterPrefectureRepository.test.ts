import { Connection, RowDataPacket } from "mysql2/promise";
import { MasterPrefectureRepository } from "../../../repositories/masterPrefecture/masterPrefectureRepository";
import { createDBConnection } from "../../utils/Database/database";
import { createMasterPrefectureTestData } from "../../utils/testData/createMasterPrefectureTestData";

let connection: Connection;

beforeEach(async () => {
  connection = await createDBConnection();
  connection.query(`SET foreign_key_checks = 0;`);
  connection.query(`delete from master_prefectures`);
});

afterEach(async () => {
  await connection.end();
});

describe("MasterPrefectureRepository", () => {
  describe("findAll", () => {
    it("shoud return 5 masterPrefecture", async () => {
      const repository = new MasterPrefectureRepository(connection);
      const createdMasterPrefectureList = await createMasterPrefectureTestData(connection, 5);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }

      for (const masterPrefecture of result) {
        const expectMasterPrefecture = createdMasterPrefectureList.filter((t) => t.id === masterPrefecture.id)[0];
        expect(masterPrefecture.id).toBe(expectMasterPrefecture.id);
        expect(masterPrefecture.name).toBe(expectMasterPrefecture.name);
      }
    });
    it("shoud return empty", async () => {
      const repository = new MasterPrefectureRepository(connection);

      const result = await repository.findAll();
      if (result instanceof Error) {
        throw new Error(`Test failed because an error has occurred: ${result.message}`);
      }
      expect(result.length).toBe(0);
    });
  });
});
