import express, { Express } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";
import mysql from "mysql2/promise";
import { PrefectureRepository } from "./repositories/prefecture/prefectureRepository";
import { PrefectureService } from "./services/prefecture/prefectureService";
import { PrefectureController } from "./controllers/prefectureController";
import { AreaRepository } from "./repositories/area/areaRepository";
import { AreaService } from "./services/area/areaService";
import { AreaController } from "./controllers/areaController";

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

  const prefectureRepository = new PrefectureRepository(connection);
  const prefectureService = new PrefectureService(prefectureRepository);
  const prefectureController = new PrefectureController(prefectureService);
  app.use("/api/", prefectureController.router);

  const areaRepository = new AreaRepository(connection);
  const areaService = new AreaService(areaRepository);
  const areaController = new AreaController(areaService);
  app.use("/api/", areaController.router);
}

main();
