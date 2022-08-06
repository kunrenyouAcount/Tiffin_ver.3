import { Connection, ResultSetHeader } from "mysql2/promise";
import { RailroadStation } from "../../../models/railroadStation";
import { createPrefectureTestData } from "./createPrefectureTestData";

export async function createRailroadStationTestData(
  connection: Connection,
  prefectureNum: number, //都道府県数を指定
  railroadStationNumByPrefecture: number //都道府県ごとのエリア数を指定
): Promise<RailroadStation[]> {
  const railroadStationList: RailroadStation[] = [];

  const prefectures = await createPrefectureTestData(connection, prefectureNum);

  for (let i = 0; i < prefectureNum; i++) {
    for (let j = 0; j < railroadStationNumByPrefecture; j++) {
      const railroadStation: RailroadStation = {
        name: `test_name_${i}_${j}`,
        post_code: `000-${i}${j}${i}${j}`,
        address: `test_address_${i}_${j}`,
        status: 0,
        master_prefecture_id: prefectures[i].id!,
      };
      const query = `insert into master_railroad_stations(name, post_code, address, status, master_prefecture_id) values("${railroadStation.name}", "${railroadStation.post_code}","${railroadStation.address}",${railroadStation.status},${railroadStation.master_prefecture_id})`;
      const [result] = await connection.query<ResultSetHeader>(query);
      railroadStation.id = result.insertId;
      railroadStationList.push(railroadStation);
    }
  }

  return railroadStationList;
}
