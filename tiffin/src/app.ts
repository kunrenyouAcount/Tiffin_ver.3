import express, { Express } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrefectureService } from "./services/prefecture/prefectureService";
import { PrefectureController } from "./controllers/prefecture/prefectureController";
import { AreaService } from "./services/area/areaService";
import { AreaController } from "./controllers/area/areaController";
import { DetailedAreaService } from "./services/detailedArea/detailedAreaService";
import { DetailedAreaController } from "./controllers/detailedArea/detailedAreaController";
import { RailroadStationService } from "./services/railroadStation/railroadStationService";
import { RailroadStationController } from "./controllers/railroadStation/railroadStationController";
import { AuthService } from "./services/auth/authService";
import { AuthController } from "./controllers/auth/authController";
import { ModalService } from "./services/modal/modalService";
import { ModalController } from "./controllers/modal/modalController";
import { CookingService } from "./services/cooking/cookingService";
import { CookingController } from "./controllers/cooking/cookingController";
import { PhotoService } from "./services/photo/photoService";
import { PhotoController } from "./controllers/photo/photoController";
import { GenreService } from "./services/genre/genreService";
import { GenreController } from "./controllers/genre/genreController";
import { KeywordSearchService } from "./services/keywordSearch/keywordSearchService";
import { KeywordSearchController } from "./controllers/keywordSearch/keywordSearchController";

async function main() {
  dotenv.config();
  const { PORT, FRONT_BASE_URL } = process.env;

  const app: Express = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOptions = {
    origin: FRONT_BASE_URL as string,
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  const server = app.listen(parseInt(PORT as string), () => {
    const address = server.address() as AddressInfo;
    console.log("Node.js is listening to PORT:" + address.port);
  });

  const prisma = new PrismaClient();

  const prefectureService = new PrefectureService(prisma);
  const prefectureController = new PrefectureController(prefectureService);
  app.use("/api/", prefectureController.router);

  const areaService = new AreaService(prisma);
  const areaController = new AreaController(areaService);
  app.use("/api/", areaController.router);

  const detailedAreaService = new DetailedAreaService(prisma);
  const detailedAreaController = new DetailedAreaController(detailedAreaService);
  app.use("/api/", detailedAreaController.router);

  const railroadStationService = new RailroadStationService(prisma);
  const railroadStationController = new RailroadStationController(railroadStationService);
  app.use("/api/", railroadStationController.router);

  const authService = new AuthService(prisma);
  const authController = new AuthController(authService);
  app.use("/api/", authController.router);

  const cookingService = new CookingService(prisma);
  const cookingController = new CookingController(cookingService);
  app.use("/api/", cookingController.router);

  const photoService = new PhotoService(prisma);
  const photoController = new PhotoController(photoService);
  app.use("/api/", photoController.router);

  const modalService = new ModalService(prisma);
  const modalController = new ModalController(modalService);
  app.use("/api/", modalController.router);

  const genreService = new GenreService(prisma);
  const genreController = new GenreController(genreService);
  app.use("/api/", genreController.router);

  const keywordSearchService = new KeywordSearchService(prisma);
  const keywordSearchController = new KeywordSearchController(keywordSearchService);
  app.use("/api", keywordSearchController.router);
}

main();
