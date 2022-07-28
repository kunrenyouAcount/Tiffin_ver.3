import { Connection, ResultSetHeader } from "mysql2/promise";
import { Area } from "../../../models/area";
import { createPrefectureTestData } from "./createPrefectureTestData";

export async function createAreaTestData(
  connection: Connection,
  prefectureNum: number, //都道府県数を指定
  areaNumByPrefecture: number //都道府県ごとのエリア数を指定
): Promise<Area[]> {
  const areaList: Area[] = [];

  const prefectures = await createPrefectureTestData(connection, prefectureNum);

  for (let i = 0; i < prefectureNum; i++) {
    for (let j = 0; j < areaNumByPrefecture; j++) {
      const area: Area = {
        name: `test_${i}_${j}`,
        master_prefecture_id: prefectures[i].id!,
      };
      const query = `insert into master_areas(name, master_prefecture_id) values("${area.name}", ${prefectures[i].id})`;
      const [result] = await connection.query<ResultSetHeader>(query);
      area.id = result.insertId;
      areaList.push(area);
    }
  }

  return areaList;
}
