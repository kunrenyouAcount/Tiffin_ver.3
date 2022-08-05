import express, { Express } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";
import mysql from "mysql2/promise";
import { PrefectureRepository } from "./repositories/prefecture/prefectureRepository";
import { PrefectureService } from "./services/prefecture/prefectureService";
import { PrefectureController } from "./controllers/prefecture/prefectureController";
import { AreaRepository } from "./repositories/area/areaRepository";
import { AreaService } from "./services/area/areaService";
import { AreaController } from "./controllers/area/areaController";
import { DetailedAreaRepository } from "./repositories/detailedArea/detailedAreaRepository";
import { DetailedAreaService } from "./services/detailedArea/detailedAreaService";
import { DetailedAreaController } from "./controllers/detailedArea/detailedAreaController";
import { RailroadStationRepository } from "./repositories/railroadStation/railroadStationRepository";
import { RailroadStationService } from "./services/railroadStation/railroadStationService";
import { RailroadStationController } from "./controllers/railroadStation/railroadStationController";

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

  const detailedAreaRepository = new DetailedAreaRepository(connection);
  const detailedAreaService = new DetailedAreaService(detailedAreaRepository);
  const detailedAreaController = new DetailedAreaController(detailedAreaService);
  app.use("/api/", detailedAreaController.router);

  const railroadStationRepository = new RailroadStationRepository(connection);
  const railroadStationService = new RailroadStationService(railroadStationRepository);
  const railroadStationController = new RailroadStationController(railroadStationService);
  app.use("/api/", railroadStationController.router);
}

main();