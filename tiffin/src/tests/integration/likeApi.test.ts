import axios from "axios";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { truncate } from "../../utils/allTableTruncate";
import { masterSeed, menuSeed, shopPhotoSeed, shopSeed, shopUserSeed, userSeed } from "../../../prisma/seed";
import { getAccessToken } from "../utils/testAuth";

dotenv.config();
const { PORT } = process.env;
axios.defaults.baseURL = `http://localhost:${PORT}`;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

let prisma = new PrismaClient();

beforeEach(async () => {
  const prisma = new PrismaClient();
  await truncate(prisma);
  await masterSeed(prisma);
  await shopUserSeed(prisma);
  await shopSeed(prisma);
  await menuSeed(prisma);
  await shopPhotoSeed(prisma);
  await userSeed(prisma);
});

afterEach(async () => {
  await truncate(prisma);
  await prisma.$disconnect();
});

describe("API like", () => {
  describe("POST /like/shop-photo/", () => {
    it("should return 1 shopPhotoId and 200 status and shopPhotoLike exist", async () => {
      const token = await getAccessToken();
      const targetId = 1;

      var shopPhotoLike = await prisma.shopPhotoLike.findFirst({
        where: {
          shopPhotoId: targetId,
          userId: 1,
        },
      });
      expect(shopPhotoLike).toBeNull();

      const response = await axios.post<number>(
        "/api/like/shop-photo/",
        {
          shop_photo_id: targetId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data).toBe(targetId);

      shopPhotoLike = await prisma.shopPhotoLike.findFirst({
        where: {
          shopPhotoId: targetId,
          userId: 1,
        },
      });
      expect(shopPhotoLike).not.toBeNull();
    });
  });

  describe("DELETE /like/shop-photo/", () => {
    it("should return 1 shopPhotoId and 200 status and shopPhotoLike not exist", async () => {
      const token = await getAccessToken();
      const targetId = 1;

      await prisma.shopPhotoLike.create({
        data: {
          shopPhotoId: 1,
          userId: 1,
        },
      });

      var shopPhotoLike = await prisma.shopPhotoLike.findFirst({
        where: {
          shopPhotoId: targetId,
          userId: 1,
        },
      });
      expect(shopPhotoLike).not.toBeNull();

      const response = await axios.delete<number>(`/api/like/shop-photo/?shop_photo_id=${targetId}`, {
        headers: {
          Authorization: token,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBe(targetId);

      shopPhotoLike = await prisma.shopPhotoLike.findFirst({
        where: {
          shopPhotoId: targetId,
          userId: 1,
        },
      });
      expect(shopPhotoLike).toBeNull();
    });
  });
});
