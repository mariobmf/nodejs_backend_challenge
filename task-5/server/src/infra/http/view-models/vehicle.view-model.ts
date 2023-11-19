import { Vehicle } from "../../../application/entities/vehicle.entity";

export class VehicleViewModel {
  static toHTTP(vehicle: Vehicle) {
    return {
      id: vehicle.id.toString(),
      veiculo: vehicle.veiculo,
      ano: vehicle.ano,
      marca: vehicle.marca,
      descricao: vehicle.descricao,
      vendido: vehicle.vendido,
      created: vehicle.created,
      updated: vehicle.updated,
    };
  }
}
