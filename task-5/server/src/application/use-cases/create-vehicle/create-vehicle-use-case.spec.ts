import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";
import { BrandType } from "../../entities/vehicle.entity";
import { CreateVehicleUseCase } from "../create-vehicle";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let createVehicleUseCase: CreateVehicleUseCase;

describe("CreateVehicleUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    createVehicleUseCase = new CreateVehicleUseCase(inMemoryVehicleRepository);
  });

  it("should create a new vehicle", async () => {
    const mockVehicleData = {
      ano: 1996,
      descricao: "Fusca Itamar",
      marca: "Volkswagen" as BrandType,
      veiculo: "Fusca",
    };
    const response = await createVehicleUseCase.execute({
      ...mockVehicleData,
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...mockVehicleData,
      })
    );
  });
});
