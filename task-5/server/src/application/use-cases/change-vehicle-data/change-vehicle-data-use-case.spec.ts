import {
  ChangeVehicleDataErrors,
  ChangeVehicleDataUseCase,
} from "../change-vehicle-data";
import { InMemoryVehicleRepository } from "../../../test/repositories/in-memory-vehicle.repository";
import { makeVehicle } from "../../../test/factories/vehicle.factory";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let changeVehicleDataUseCase: ChangeVehicleDataUseCase;

describe("ChangeVehicleDataUseCase", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    changeVehicleDataUseCase = new ChangeVehicleDataUseCase(
      inMemoryVehicleRepository
    );
  });

  it("should update a vehicle year", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);

    const response = await changeVehicleDataUseCase.execute({
      id: vehicle.id.toString(),
      ano: 2001,
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...vehicle,
        ano: 2001,
      })
    );
  });
  it("should update a vehicle description", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);

    const response = await changeVehicleDataUseCase.execute({
      id: vehicle.id.toString(),
      descricao: "Nova descrição",
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...vehicle,
        descricao: "Nova descrição",
      })
    );
  });
  it("should update a vehicle brand", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);

    const response = await changeVehicleDataUseCase.execute({
      id: vehicle.id.toString(),
      marca: "Hyundai",
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...vehicle,
        marca: "Hyundai",
      })
    );
  });
  it("should update a vehicle veiculo", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);

    const response = await changeVehicleDataUseCase.execute({
      id: vehicle.id.toString(),
      veiculo: "HB20",
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...vehicle,
        veiculo: "HB20",
      })
    );
  });

  it("should update a vehicle to sold", async () => {
    const vehicle = makeVehicle();
    await inMemoryVehicleRepository.create(vehicle);

    const response = await changeVehicleDataUseCase.execute({
      id: vehicle.id.toString(),
      vendido: true,
    });
    expect(response.isSuccess()).toBeTruthy();
    expect(response.value).toEqual(
      expect.objectContaining({
        ...vehicle,
        vendido: true,
      })
    );
  });

  it("should not change the data of a non-existent vehicle", async () => {
    const response = await changeVehicleDataUseCase.execute({
      id: "vehicle_non_existent",
      ano: 1996,
      descricao: "Fusca Itamar",
      marca: "Volkswagen",
      veiculo: "Fusca",
      vendido: true,
    });
    expect(response.isFailure()).toBeTruthy();
    expect(response.value).toBeInstanceOf(
      ChangeVehicleDataErrors.VehicleNotFound
    );
  });
});
