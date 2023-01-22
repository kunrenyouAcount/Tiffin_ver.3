import { RailroadStation } from "../../../models/railroadStation";
import { IRailroadStationRepository } from "../../../repositories/railroadStation/interface";
import { RailroadStationService } from "../../../services/railroadStation/railroadStationService";
import { NotFoundDataError } from "../../../utils/error";

function createMockRepository(): IRailroadStationRepository {
  const mockRepository: IRailroadStationRepository = {
    findAll: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
    getByPrefectureId: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
    getById: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
    searchByKeyword: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
  };

  return mockRepository;
}

function createMockRailroadStationList(
  prefectureNum: number, //都道府県数を指定
  railroadStationNumByPrefecture: number //都道府県ごとのエリア数を指定
): RailroadStation[] {
  const railroadStationList: RailroadStation[] = [];

  for (let i = 1; i < prefectureNum + 1; i++) {
    for (let j = 1; j < railroadStationNumByPrefecture + 1; j++) {
      const railroadStation: RailroadStation = {
        id: i * railroadStationNumByPrefecture + j,
        name: `test_name_${i}_${j}`,
        post_code: `000-${i}${j}${i}${j}`,
        address: `test_address_${i}_${j}`,
        status: 0,
        master_prefecture_id: i,
      };
      railroadStationList.push(railroadStation);
    }
  }

  return railroadStationList;
}

describe("RailroadStationService", () => {
  describe("findAll", () => {
    it("should return 10 railroadStation", async () => {
      const mockResult: RailroadStation[] = createMockRailroadStationList(2, 5);

      let mockRepository = createMockRepository();
      mockRepository.findAll = jest.fn(() => new Promise<RailroadStation[] | Error>((resolve) => resolve(mockResult)));
      const service = new RailroadStationService(mockRepository);

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
      mockRepository.findAll = jest.fn(() => new Promise<RailroadStation[] | Error>((resolve) => resolve(mockResult)));
      const service = new RailroadStationService(mockRepository);

      const result = await service.findAll();

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });

  describe("getByPrefectureId", () => {
    it("should return 5 railroadStations", async () => {
      const mockResult: RailroadStation[] = createMockRailroadStationList(1, 5);
      let mockRepository = createMockRepository();
      mockRepository.getByPrefectureId = jest.fn(
        () => new Promise<RailroadStation[] | Error>((resolve) => resolve(mockResult))
      );
      const service = new RailroadStationService(mockRepository);

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
        () => new Promise<RailroadStation[] | Error>((resolve) => resolve(mockGetByPrefectureIdResult))
      );

      const service = new RailroadStationService(mockRepository);
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
      mockRepository.getByPrefectureId = jest.fn(
        () => new Promise<RailroadStation[] | Error>((resolve) => resolve(mockResult))
      );
      const service = new RailroadStationService(mockRepository);

      const result = await service.getByPrefectureId(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });
});
