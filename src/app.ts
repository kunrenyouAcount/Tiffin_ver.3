import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import * as dotenv from "dotenv";

async function main() {
    dotenv.config();
    const { PORT } = process.env;

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

  app.get("/", async (req: express.Request, res: express.Response) => {
    res.json("テスト");
  });
}

main();