import { Vehicle } from "../../application/entities/vehicle.entity";
import {
  FindByQueryDTO,
  VehicleRepository,
} from "../../application/repositories/vehicle-repository.interface";

class InMemoryVehicleRepository implements VehicleRepository {
  public vehicles: Vehicle[] = [];

  public async create(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    return vehicle;
  }

  public async findAll() {
    return this.vehicles;
  }

  public async findByQuery({
    ano,
    descricao,
    marca,
    veiculo,
    vendido,
  }: FindByQueryDTO) {
    const vehicles = this.vehicles.filter(
      (vehicle) =>
        vehicle.ano === ano ||
        vehicle.descricao === descricao ||
        vehicle.marca === marca ||
        vehicle.veiculo === veiculo ||
        vehicle.vendido === vendido
    );
    return vehicles;
  }

  public async findById(id: string) {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle.id.toString() === id
    );

    return vehicle || null;
  }

  public async update(vehicle: Vehicle) {
    const vehicleIndex = this.vehicles.findIndex(
      (vehicle) => vehicle.id === vehicle.id
    );

    if (vehicleIndex < 0) return null;

    this.vehicles[vehicleIndex] = Object.assign(this.vehicles[vehicleIndex], {
      ...vehicle,
    });

    return this.vehicles[vehicleIndex];
  }

  public async delete(id: string) {
    const vehicles = this.vehicles.filter(
      (vehicle) => vehicle.id.toString() !== id
    );

    this.vehicles = vehicles;
  }
}

export { InMemoryVehicleRepository };
