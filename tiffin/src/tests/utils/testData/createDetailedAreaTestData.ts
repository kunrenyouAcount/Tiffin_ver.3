import { Connection, ResultSetHeader } from "mysql2/promise";
import { DetailedArea } from "../../../models/detailedArea";
import { createAreaTestData } from "./createAreaTestData";

export async function createDetailedAreaTestData(
  connection: Connection,
  prefectureNum: number, //都道府県数を指定
  areaNumByPrefecture: number, //都道府県ごとのエリア数を指定
  detailedAreaNumByArea: number //エリアごとの都道府県数を指定
): Promise<DetailedArea[]> {
  const detailedAreaList: DetailedArea[] = [];

  const areas = await createAreaTestData(connection, prefectureNum, areaNumByPrefecture);

  for (let i = 0; i < prefectureNum; i++) {
    for (let j = 0; j < areaNumByPrefecture; j++) {
      for (let k = 0; k < detailedAreaNumByArea; k++) {
        const detailedArea: DetailedArea = {
          name: `test_${i}_${j}_${k}`,
          master_area_id: areas[i * areaNumByPrefecture + j].id!,
        };
        const query = `insert into master_detailed_areas(name, master_area_id) values("${detailedArea.name}", ${detailedArea.master_area_id})`;
        const [result] = await connection.query<ResultSetHeader>(query);
        detailedArea.id = result.insertId;
        detailedAreaList.push(detailedArea);
      }
    }
  }

  return detailedAreaList;
}
