import { makeVehicle } from "../../../test/factories/vehicle.factory";
import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";
import { ListVehiclesByQueryUseCase } from "../list-vehicles-by-query";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let listVehiclesByQueryUseCase: ListVehiclesByQueryUseCase;

describe("ListVehiclesByQueryUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    listVehiclesByQueryUseCase = new ListVehiclesByQueryUseCase(
      inMemoryVehicleRepository
    );
  });

  it("should list the vehicles through a custom query", async () => {
    await inMemoryVehicleRepository.create(
      makeVehicle({
        ano: 1996,
        descricao: "Fusca Itamar",
        marca: "Volkswagen",
        veiculo: "Fusca",
      })
    );
    await inMemoryVehicleRepository.create(
      makeVehicle({
        ano: 1980,
        descricao: "Fusca",
        marca: "Volkswagen",
        veiculo: "Fusca",
      })
    );
    const response = await listVehiclesByQueryUseCase.execute({
      ano: 1996,
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toHaveLength(1);
  });
});
