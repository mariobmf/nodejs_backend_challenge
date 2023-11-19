import { DeleteVehicleUseCase, DeleteVehicleErrors } from "../delete-vehicle";
import { makeVehicle } from "../../../test/factories/vehicle.factory";
import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let deleteVehicleUseCase: DeleteVehicleUseCase;

describe("DeleteVehicleUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    deleteVehicleUseCase = new DeleteVehicleUseCase(inMemoryVehicleRepository);
  });

  it("should delete a vehicle", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);
    const response = await deleteVehicleUseCase.execute({
      id: vehicle.id.toString(),
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(inMemoryVehicleRepository.vehicles).toHaveLength(0);
  });

  it("should not delete a non-existent vehicle", async () => {
    const response = await deleteVehicleUseCase.execute({
      id: "vehicle_non_existent",
    });
    expect(response.isFailure()).toBeTruthy();
    expect(response.value).toBeInstanceOf(DeleteVehicleErrors.VehicleNotFound);
  });
});
