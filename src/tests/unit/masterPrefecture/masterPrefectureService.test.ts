import { MasterPrefecture } from "../../../../src/models/masterPrefecture";
import { IMasterPrefectureRepository } from "../../../../src/repositories/masterPrefecture/interface";
import { MasterPrefectureService } from "../../../../src/services/masterPrefecture/masterPrefectureService";
import { NotFoundDataError } from "../../../utils/error";

function createMockRepository(): IMasterPrefectureRepository {
  const mockRepository: IMasterPrefectureRepository = {
    findAll: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
    getById: jest.fn(() => {
      throw new Error("Function not implemented.");
    }),
  };

  return mockRepository;
}

function createMockMasterPrefectureList(num: number): MasterPrefecture[] {
  const masterPrefectureList: MasterPrefecture[] = [];

  for (let index = 0; index < num; index++) {
    const masterPrefecture: MasterPrefecture = {
      id: index,
      name: `test_${index}`,
    };
    masterPrefectureList.push(masterPrefecture);
  }

  return masterPrefectureList;
}

describe("MasterPrefectureService", () => {
  describe("findAll", () => {
    it("should return 5 masterPrefecture", async () => {
      const mockResult: MasterPrefecture[] = createMockMasterPrefectureList(5);

      let mockRepository = createMockRepository();
      mockRepository.findAll = jest.fn(() => new Promise<MasterPrefecture[] | Error>((resolve) => resolve(mockResult)));
      const service = new MasterPrefectureService(mockRepository);

      const result = await service.findAll();

      if (result instanceof Error) {
        throw new Error("Test failed because an error has occurred.");
      }

      expect(5).toBe(result.length);

      for (let index = 0; index < result.length; index++) {
        expect(mockResult[index].id).toBe(result[index].id);
        expect(mockResult[index].name).toBe(result[index].name);
      }
    });

    it("should return repository error", async () => {
      const errMsg = "mock error";
      const mockResult: Error = new Error(errMsg);

      let mockRepository = createMockRepository();
      mockRepository.findAll = jest.fn(() => new Promise<MasterPrefecture[] | Error>((resolve) => resolve(mockResult)));
      const service = new MasterPrefectureService(mockRepository);

      const result = await service.findAll();

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });

  describe("getById", () => {
    it("should return masterPrefecture", async () => {
      const mockResult: MasterPrefecture = {
        id: 1,
        name: "東京都",
      };

      let mockRepository = createMockRepository();
      mockRepository.getById = jest.fn(() => new Promise<MasterPrefecture | Error>((resolve) => resolve(mockResult)));
      const service = new MasterPrefectureService(mockRepository);

      const result = await service.getById(1);

      if (result instanceof Error) {
        throw new Error("Test failed because an error has occurred.");
      }

      expect(result.id).toBe(mockResult.id);
    });

    it("shoud return notfound error", async () => {
      const mockGetByIdResult: Error = new NotFoundDataError("mock notfound error");

      let mockRepository = createMockRepository();
      mockRepository.getById = jest.fn(
        () => new Promise<MasterPrefecture | Error>((resolve) => resolve(mockGetByIdResult))
      );

      const service = new MasterPrefectureService(mockRepository);
      const result = await service.getById(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result instanceof NotFoundDataError).toBeTruthy();
      expect(result.message).toBe(mockGetByIdResult.message);
    });

    it("should return repository error", async () => {
      const errMsg = "mock error";
      const mockResult: Error = new Error(errMsg);

      let mockRepository = createMockRepository();
      mockRepository.getById = jest.fn(() => new Promise<MasterPrefecture | Error>((resolve) => resolve(mockResult)));
      const service = new MasterPrefectureService(mockRepository);

      const result = await service.getById(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });
});
