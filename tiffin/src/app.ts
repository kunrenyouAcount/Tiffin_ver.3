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
import { UserRepository } from "./repositories/user/userRepository";
import { AuthService } from "./services/auth/authService";
import { AuthController } from "./controllers/auth/authController";
import { MenuRepository } from "./repositories/menu/menuRepository";
import { MenuService } from "./services/menu/menuService";
import { MenuController } from "./controllers/menu/menuController";
import { CookingRepository } from "./repositories/cooking/cookingRepository";
import { CookingService } from "./services/cooking/cookingService";
import { CookingController } from "./controllers/cooking/cookingController";
import { ShopPhotoRepository } from "./repositories/shopPhoto/shopPhotoRepository";
import { PhotoService } from "./services/photo/photoService";
import { PhotoController } from "./controllers/photo/photoController";
import { GenreService } from "./services/genre/genreService";
import { GenreRepository } from "./repositories/genre/genreRepository";
import { GenreController } from "./controllers/genre/genreController";
import { ShopRepository } from "./repositories/shop/shopRepository";
import { PlaceService } from "./services/place/placeService";
import { PlaceController } from "./controllers/place/placeController";
import { EatingService } from "./services/eating/eatingService";
import { EatingController } from "./controllers/eating/eatingController";
import { ShopPhotoLikeRepository } from "./repositories/shopPhotoLike/shopPhotoLikeRepository";
import { ShopPhotoLikeService } from "./services/shopPhotoLike/shopPhotoLikeService";
import { ShopPhotoLikeController } from "./controllers/shopPhotoLike/shopPhotoLikeController";

async function main() {
  dotenv.config();
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB, PORT, FRONT_BASE_URL } = process.env;

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

  const userRepository = new UserRepository(connection);
  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);
  app.use("/api/", authController.router);

  const cookingRepository = new CookingRepository(connection);
  const cookingService = new CookingService(cookingRepository);
  const cookingController = new CookingController(cookingService);
  app.use("/api/", cookingController.router);

  const shopPhotoRepository = new ShopPhotoRepository(connection);
  const photoService = new PhotoService(shopPhotoRepository);
  const photoController = new PhotoController(photoService);
  app.use("/api/", photoController.router);

  const menuRepository = new MenuRepository(connection);
  const shopRepository = new ShopRepository(connection);
  const menuService = new MenuService(menuRepository, shopRepository, shopPhotoRepository, railroadStationRepository);
  const menuController = new MenuController(menuService);
  app.use("/api/", menuController.router);

  const genreRepository = new GenreRepository(connection);
  const genreService = new GenreService(genreRepository);
  const genreController = new GenreController(genreService);
  app.use("/api/", genreController.router);

  const placeService = new PlaceService(
    prefectureRepository,
    areaRepository,
    detailedAreaRepository,
    railroadStationRepository
  );
  const placeController = new PlaceController(placeService);
  app.use("/api/", placeController.router);

  const eatingService = new EatingService(genreRepository, cookingRepository);
  const eatingController = new EatingController(eatingService);
  app.use("/api/", eatingController.router);

  const shopPhotoLikeRepository = new ShopPhotoLikeRepository(connection);
  const shopPhotoLikeService = new ShopPhotoLikeService(shopPhotoLikeRepository);
  const shopPhotoLikeController = new ShopPhotoLikeController(shopPhotoLikeService);
  app.use("/api/", shopPhotoLikeController.router);
}

main();
