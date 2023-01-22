import { Prefecture } from "../../../models/prefecture";
import { IPrefectureRepository } from "../../../repositories/prefecture/interface";
import { PrefectureService } from "../../../services/prefecture/prefectureService";
import { NotFoundDataError } from "../../../utils/error";

function createMockRepository(): IPrefectureRepository {
  const mockRepository: IPrefectureRepository = {
    findAll: jest.fn(() => {
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

function createMockPrefectureList(num: number): Prefecture[] {
  const prefectureList: Prefecture[] = [];

  for (let index = 0; index < num; index++) {
    const prefecture: Prefecture = {
      id: index,
      name: `test_${index}`,
    };
    prefectureList.push(prefecture);
  }

  return prefectureList;
}

describe("PrefectureService", () => {
  describe("findAll", () => {
    it("should return 5 prefecture", async () => {
      const mockResult: Prefecture[] = createMockPrefectureList(5);

      let mockRepository = createMockRepository();
      mockRepository.findAll = jest.fn(() => new Promise<Prefecture[] | Error>((resolve) => resolve(mockResult)));
      const service = new PrefectureService(mockRepository);

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
      mockRepository.findAll = jest.fn(() => new Promise<Prefecture[] | Error>((resolve) => resolve(mockResult)));
      const service = new PrefectureService(mockRepository);

      const result = await service.findAll();

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });

  describe("getById", () => {
    it("should return prefecture", async () => {
      const mockResult: Prefecture = {
        id: 1,
        name: "東京都",
      };

      let mockRepository = createMockRepository();
      mockRepository.getById = jest.fn(() => new Promise<Prefecture | Error>((resolve) => resolve(mockResult)));
      const service = new PrefectureService(mockRepository);

      const result = await service.getById(1);

      if (result instanceof Error) {
        throw new Error("Test failed because an error has occurred.");
      }

      expect(result.id).toBe(mockResult.id);
    });

    it("shoud return notfound error", async () => {
      const mockGetByIdResult: Error = new NotFoundDataError("mock notfound error");

      let mockRepository = createMockRepository();
      mockRepository.getById = jest.fn(() => new Promise<Prefecture | Error>((resolve) => resolve(mockGetByIdResult)));

      const service = new PrefectureService(mockRepository);
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
      mockRepository.getById = jest.fn(() => new Promise<Prefecture | Error>((resolve) => resolve(mockResult)));
      const service = new PrefectureService(mockRepository);

      const result = await service.getById(1);

      if (!(result instanceof Error)) {
        throw new Error("Test failed because no error occurred");
      }

      expect(result.message).toBe(mockResult.message);
    });
  });
});
