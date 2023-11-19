import { Either, success } from "../../../shared/core/either";
import { BrandType, Vehicle } from "../../entities/vehicle.entity";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";

interface ListVehiclesByQueryUseCaseRequest {
  veiculo?: string;
  ano?: number;
  descricao?: string;
  marca?: BrandType;
  vendido?: boolean;
}

type Response = Either<null, Vehicle[]>;

class ListVehiclesByQueryUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute(
    query: ListVehiclesByQueryUseCaseRequest
  ): Promise<Response> {
    const vehicles = await this.vehicleRepository.findByQuery(query);
    return success(vehicles);
  }
}

export { ListVehiclesByQueryUseCase };
