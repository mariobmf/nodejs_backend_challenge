import { ChangeVehicleDataErrors } from "../change-vehicle-data";
import { Either, failure, success } from "../../../shared/core/either";
import { VehicleRepository } from "../../repositories/vehicle-repository.interface";
import { BrandType, Vehicle } from "../../entities/vehicle.entity";

interface ChangeVehicleDataUseCaseRequest {
  id: string;
  veiculo?: string;
  ano?: number;
  descricao?: string;
  marca?: BrandType;
  vendido?: boolean;
}

type Response = Either<ChangeVehicleDataErrors.VehicleNotFound, Vehicle>;

class ChangeVehicleDataUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  public async execute(
    props: ChangeVehicleDataUseCaseRequest
  ): Promise<Response> {
    const { id, ano, descricao, marca, veiculo, vendido } = props;
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) return failure(new ChangeVehicleDataErrors.VehicleNotFound());
    vehicle.veiculo = veiculo || vehicle.veiculo;
    vehicle.ano = ano || vehicle.ano;
    vehicle.descricao = descricao || vehicle.descricao;
    vehicle.marca = marca || vehicle.marca;
    vehicle.vendido = vendido || vehicle.vendido;
    await this.vehicleRepository.update(vehicle);
    return success(vehicle);
  }
}

export { ChangeVehicleDataUseCase };
