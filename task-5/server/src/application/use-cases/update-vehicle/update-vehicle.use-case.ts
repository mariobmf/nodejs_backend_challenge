import { UpdateVehicleErrors } from "../update-vehicle";
import { BrandType, Vehicle } from "../../entities/vehicle.entity";
import { Either, failure, success } from "../../../shared/core/either";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";

interface UpdateVehicleUseCaseRequest {
  id: string;
  veiculo: string;
  ano: number;
  descricao: string;
  marca: BrandType;
  vendido: boolean;
}

type Response = Either<UpdateVehicleErrors.VehicleNotFound, Vehicle>;

class UpdateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute({
    id,
    veiculo,
    ano,
    descricao,
    marca,
    vendido,
  }: UpdateVehicleUseCaseRequest): Promise<Response> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) return failure(new UpdateVehicleErrors.VehicleNotFound());
    vehicle.veiculo = veiculo;
    vehicle.ano = ano;
    vehicle.descricao = descricao;
    vehicle.marca = marca;
    vehicle.vendido = vendido;
    await this.vehicleRepository.update(vehicle);
    return success(vehicle);
  }
}

export { UpdateVehicleUseCase };
