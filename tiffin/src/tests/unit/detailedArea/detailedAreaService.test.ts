import { Area } from "../../../models/area";
import { IAreaRepository } from "../../../repositories/area/interface";
import { AreaService } from "../../../services/area/areaService";
import { NotFoundDataError } from "../../../utils/error";

function createMockRepository(): IAreaRepository {
  const mockRepository: IAreaRepository = {
    findAll: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
    getByPrefectureId: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
    searchByKeyword: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
  };

  return mockRepository;
}

function createMockAreaList(
  prefectureNum: number, //都道府県数を指定
  areaNumByPrefecture: number //都道府県ごとのエリア数を指定
): Area[] {
  const areaList: Area[] = [];

  for (let i = 1; i < prefectureNum + 1; i++) {
    for (let j = 1; j < areaNumByPrefecture + 1; j++) {
      const area: Area = {
        id: i * areaNumByPrefecture + j,
        name: `test_${i}_${j}`,
        master_prefecture_id: i,
      };
      areaList.push(area);
    }
  }

  return areaList;
}

describe("AreaService", () => {
  describe("findAll", () => {
    it("should return 10 area", async () => {
      const mockResult: Area[] = createMockAreaList(2, 5);

      let mockRepository = createMockRepository();
      mockRepository.findAll = jest.fn(() => new Promise<Area[] | Error>((resolve) => resolve(mockResult)));
      const service = new AreaService(mockRepository);

      const result = await service.findAll();

      if (result instanceof Error) {
        throw new Error("Test failed because an error has occurred.");
      }

      expect(10).toBe(result.length);

      for (let index = 0; index < result.length; index++) {
        expect(mockResult[index].id).toBe(result[index].id);
        expect(mockResult[index].name).toBe(result[index].name);
        expect(mockResult[index].master_prefecture_id).toBe(result[index].master_prefecture_id);
      }
    });

    it("should return repository error", async () => {
      const errMsg = "mock error";
      const mockResult: Error = new Error(errMsg);

      let mockRepository = createMockRepository();
      mockRepository.findAll = jest.fn(() => new Promise<Area[] | Error>((resolve) => resolve(mockResult)));
      const service = new AreaService(mockRepository);

      const result = await service.findAll();

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });

  describe("getByPrefectureId", () => {
    it("should return 5 areas", async () => {
      const mockResult: Area[] = createMockAreaList(1, 5);
      let mockRepository = createMockRepository();
      mockRepository.getByPrefectureId = jest.fn(() => new Promise<Area[] | Error>((resolve) => resolve(mockResult)));
      const service = new AreaService(mockRepository);

      const result = await service.getByPrefectureId(1);

      if (result instanceof Error) {
        throw new Error("Test failed because an error has occurred.");
      }

      for (let index = 0; index < result.length; index++) {
        expect(result[index].id).toBe(mockResult[index].id);
      }
    });

    it("shoud return notfound error", async () => {
      const mockGetByPrefectureIdResult: Error = new NotFoundDataError("mock notfound error");

      let mockRepository = createMockRepository();
      mockRepository.getByPrefectureId = jest.fn(
        () => new Promise<Area[] | Error>((resolve) => resolve(mockGetByPrefectureIdResult))
      );

      const service = new AreaService(mockRepository);
      const result = await service.getByPrefectureId(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result instanceof NotFoundDataError).toBeTruthy();
      expect(result.message).toBe(mockGetByPrefectureIdResult.message);
    });

    it("should return repository error", async () => {
      const errMsg = "mock error";
      const mockResult: Error = new Error(errMsg);

      let mockRepository = createMockRepository();
      mockRepository.getByPrefectureId = jest.fn(() => new Promise<Area[] | Error>((resolve) => resolve(mockResult)));
      const service = new AreaService(mockRepository);

      const result = await service.getByPrefectureId(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });
});
