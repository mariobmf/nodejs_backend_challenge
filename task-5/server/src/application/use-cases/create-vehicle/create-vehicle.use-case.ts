import { Either, success } from "../../../shared/core/either";
import { BrandType, Vehicle } from "../../entities/vehicle.entity";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";

interface CreateVehicleUseCaseRequest {
  veiculo: string;
  marca: BrandType;
  ano: number;
  descricao: string;
}

type Response = Either<null, Vehicle>;

class CreateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute({
    veiculo,
    ano,
    descricao,
    marca,
  }: CreateVehicleUseCaseRequest): Promise<Response> {
    const vehicle = new Vehicle({
      ano,
      descricao,
      marca,
      veiculo,
    });
    await this.vehicleRepository.create(vehicle);
    return success(vehicle);
  }
}

export { CreateVehicleUseCase };
