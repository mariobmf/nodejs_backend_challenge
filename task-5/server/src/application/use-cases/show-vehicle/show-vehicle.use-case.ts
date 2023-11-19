import { Either, failure, success } from "../../../shared/core/either";
import { Vehicle } from "../../entities/vehicle.entity";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";
import { ShowVehicleErrors } from "../show-vehicle";

interface ShowVehicleUseCaseRequest {
  id: string;
}

type Response = Either<ShowVehicleErrors.VehicleNotFound, Vehicle>;

class ShowVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute({ id }: ShowVehicleUseCaseRequest): Promise<Response> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) return failure(new ShowVehicleErrors.VehicleNotFound());
    return success(vehicle);
  }
}

export { ShowVehicleUseCase };
