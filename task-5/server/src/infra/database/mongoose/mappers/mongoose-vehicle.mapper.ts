import { Vehicle } from "../../../../application/entities/vehicle.entity";
import { MongooseVehicle } from "../models/vehicle.model";

export class MongooseVehicleMapper {
  static toMongoose(vehicle: Vehicle): MongooseVehicle {
    return {
      _id: vehicle.id.toString(),
      veiculo: vehicle.veiculo,
      ano: vehicle.ano,
      descricao: vehicle.descricao,
      marca: vehicle.marca,
      vendido: vehicle.vendido,
      created: vehicle.created,
      updated: vehicle.updated,
    };
  }

  static toDomain(raw: MongooseVehicle): Vehicle {
    return new Vehicle(
      {
        ano: raw.ano,
        descricao: raw.descricao,
        marca: raw.marca,
        veiculo: raw.veiculo,
        vendido: raw.vendido,
        created: raw.created,
        updated: raw.updated,
      },
      raw._id.toString()
    );
  }
}
