import { makeVehicle } from "../../../test/factories/vehicle.factory";
import { Vehicle } from "../vehicle.entity";

describe("VehicleEntity", () => {
  it("should create a new Vehicle", async () => {
    const vehicle = new Vehicle({
      veiculo: "Fusca",
      ano: 1970,
      descricao: "Carro antigo",
      marca: "Volkswagen",
    });
    expect(vehicle).toHaveProperty("id");
    expect(vehicle.created).toBeInstanceOf(Date);
    expect(vehicle.updated).toBeInstanceOf(Date);
  });
  it("should create Vehicle with existing data", async () => {
    const vehicleData = makeVehicle();
    const vehicle = new Vehicle(
      {
        veiculo: vehicleData.veiculo,
        ano: vehicleData.ano,
        descricao: vehicleData.descricao,
        marca: vehicleData.marca,
        vendido: vehicleData.vendido,
        created: vehicleData.created,
        updated: vehicleData.updated,
      },
      vehicleData.id.toString()
    );
    expect(vehicle.id).toEqual(vehicleData.id);
    expect(vehicle).toEqual(expect.objectContaining(vehicleData));
  });
  it("should update a Vehicle", async () => {
    const vehicle = makeVehicle();
    vehicle.veiculo = "new_veiculo";
    vehicle.ano = 2020;
    vehicle.descricao = "new_descricao";
    vehicle.marca = "BMW";
    vehicle.vendido = true;
    expect(vehicle).toEqual(
      expect.objectContaining({
        veiculo: "new_veiculo",
        ano: 2020,
        descricao: "new_descricao",
        marca: "BMW",
        vendido: true,
      })
    );
  });
});
