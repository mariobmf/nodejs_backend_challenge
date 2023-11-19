import { ShowVehicleUseCase, ShowVehicleErrors } from "../show-vehicle";
import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";
import { makeVehicle } from "../../../test/factories/vehicle.factory";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let showVehicleUseCase: ShowVehicleUseCase;

describe("ShowVehicleUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    showVehicleUseCase = new ShowVehicleUseCase(inMemoryVehicleRepository);
  });

  it("should show the data of a vehicle", async () => {
    const vehicle = makeVehicle({
      ano: 1996,
      descricao: "Fusca Itamar",
      marca: "Volkswagen",
      veiculo: "Fusca",
    });
    await inMemoryVehicleRepository.create(vehicle);
    const response = await showVehicleUseCase.execute({
      id: vehicle.id.toString(),
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...vehicle,
      })
    );
  });

  it("should not show the data of a non-existent vehicle", async () => {
    const response = await showVehicleUseCase.execute({
      id: "vehicle_non_existent",
    });
    expect(response.isFailure()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ShowVehicleErrors.VehicleNotFound);
  });
});
