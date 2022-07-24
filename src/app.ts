import express, { Express, Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { MasterPrefecture } from "./models/masterPrefecture";

async function main() {
  dotenv.config();
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB, PORT } = process.env;

  const app: Express = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  const server = app.listen(parseInt(PORT as string), () => {
    const address = server.address() as AddressInfo;
    console.log("Node.js is listening to PORT:" + address.port);
  });

  const connection = await mysql.createConnection({
    host: MYSQL_HOST as string,
    port: parseInt(MYSQL_PORT as string),
    user: MYSQL_USER as string,
    password: MYSQL_PASS as string,
    database: MYSQL_DB as string,
  });

  app.get("/master-prefectures", async (req: Request, res: Response) => {
    const sql = "select * from master_prefectures";
    const [rows] = await connection.execute<MasterPrefecture[] & RowDataPacket[]>(sql);
    res.json(rows);
  });
}

main();
