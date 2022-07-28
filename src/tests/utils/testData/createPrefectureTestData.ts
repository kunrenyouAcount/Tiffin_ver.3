import { Connection, ResultSetHeader } from "mysql2/promise";
import { Prefecture } from "../../../models/prefecture";

export async function createPrefectureTestData(connection: Connection, num: number): Promise<Prefecture[]> {
  const prefectureList: Prefecture[] = [];

  for (let index = 0; index < num; index++) {
    const prefecture: Prefecture = {
      name: `test_${index}`,
    };
    const query = `insert into master_prefectures(name) values("${prefecture.name}")`;
    const [result] = await connection.query<ResultSetHeader>(query);

    prefecture.id = result.insertId;
    prefectureList.push(prefecture);
  }

  return prefectureList;
}
