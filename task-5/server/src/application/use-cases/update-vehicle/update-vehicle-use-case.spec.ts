import { makeVehicle } from "../../../test/factories/vehicle.factory";
import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";
import { BrandType } from "../../entities/vehicle.entity";
import { UpdateVehicleUseCase, UpdateVehicleErrors } from "../update-vehicle";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let updateVehicleUseCase: UpdateVehicleUseCase;

describe("UpdateVehicleUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();

    updateVehicleUseCase = new UpdateVehicleUseCase(inMemoryVehicleRepository);
  });

  it("should update all vehicle data", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);
    const mockVehicleData = {
      id: vehicle.id.toString(),
      ano: 2010,
      descricao: "Palio Fire 1.0 4p",
      marca: "Fiat" as BrandType,
      veiculo: "Palio",
      vendido: true,
    };
    const response = await updateVehicleUseCase.execute(mockVehicleData);
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...mockVehicleData,
        id: vehicle.id,
      })
    );
  });

  it("should not update the data of a non-existent vehicle", async () => {
    const response = await updateVehicleUseCase.execute({
      id: "vehicle_non_existent",
      ano: 1996,
      descricao: "Fusca Itamar",
      marca: "Volkswagen",
      veiculo: "Fusca",
      vendido: true,
    });
    expect(response.isFailure()).toBeTruthy();
    expect(response.value).toBeInstanceOf(UpdateVehicleErrors.VehicleNotFound);
  });
});
