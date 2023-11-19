import { makeVehicle } from "../../../test/factories/vehicle.factory";
import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";
import { ListVehiclesUseCase } from "../list-vehicles";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let listVehiclesUseCase: ListVehiclesUseCase;

describe("ListVehiclesUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    listVehiclesUseCase = new ListVehiclesUseCase(inMemoryVehicleRepository);
  });

  it("should list all registered vehicles", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);
    const response = await listVehiclesUseCase.execute();
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toHaveLength(1);
  });
});
