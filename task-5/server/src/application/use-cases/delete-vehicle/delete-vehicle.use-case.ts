import { Either, failure, success } from "../../../shared/core/either";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";
import { DeleteVehicleErrors } from "../delete-vehicle";

interface DeleteVehicleUseCaseRequest {
  id: string;
}

type Response = Either<DeleteVehicleErrors.VehicleNotFound, null>;

class DeleteVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute({ id }: DeleteVehicleUseCaseRequest): Promise<Response> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) return failure(new DeleteVehicleErrors.VehicleNotFound());
    await this.vehicleRepository.delete(id);
    return success(null);
  }
}

export { DeleteVehicleUseCase };
