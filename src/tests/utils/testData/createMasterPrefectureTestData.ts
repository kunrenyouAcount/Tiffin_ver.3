import { Connection, ResultSetHeader } from "mysql2/promise";
import { MasterPrefecture } from "../../../models/masterPrefecture";

export async function createMasterPrefectureTestData(connection: Connection, num: number): Promise<MasterPrefecture[]> {
  const prefectureList: MasterPrefecture[] = [];

  for (let index = 0; index < num; index++) {
    const prefecture: MasterPrefecture = {
      name: `test_${index}`,
    };
    const query = `insert into master_prefectures(name) values("${prefecture.name}")`;
    const [result] = await connection.query<ResultSetHeader>(query);

    prefecture.id = result.insertId;
    prefectureList.push(prefecture);
  }

  return prefectureList;
}
