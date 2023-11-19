import { Either, success } from "../../../shared/core/either";
import { Vehicle } from "../../entities/vehicle.entity";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";

type Response = Either<null, Vehicle[]>;

class ListVehiclesUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute(): Promise<Response> {
    const vehicles = await this.vehicleRepository.findAll();
    return success(vehicles);
  }
}

export { ListVehiclesUseCase };
