import { Vehicle } from "../../../../application/entities/vehicle.entity";
import {
  FindByQueryDTO,
  VehicleRepository,
} from "../../../../application/repositories/vehicle-repository.interface";
import { MongooseVehicleMapper } from "../mappers/mongoose-vehicle.mapper";
import { VehicleModel } from "../models/vehicle.model";

class MongooseVehicleRepository implements VehicleRepository {
  public async create(vehicleData: Vehicle) {
    const rawVehicleData = MongooseVehicleMapper.toMongoose(vehicleData);
    const rawVehicle = await VehicleModel.create({
      ...rawVehicleData,
    });
    return MongooseVehicleMapper.toDomain(rawVehicle);
  }

  public async findAll() {
    const rawVehicles = await VehicleModel.find();
    return rawVehicles.map(MongooseVehicleMapper.toDomain);
  }

  public async findByQuery(query: FindByQueryDTO) {
    const rawVehicles = await VehicleModel.find({ ...query });
    return rawVehicles.map(MongooseVehicleMapper.toDomain);
  }

  public async findById(id: string) {
    const rawVehicle = await VehicleModel.findById(id);
    return rawVehicle ? MongooseVehicleMapper.toDomain(rawVehicle) : null;
  }

  public async update(vehicleData: Vehicle) {
    const rawVehicleData = MongooseVehicleMapper.toMongoose(vehicleData);
    const rawVehicle = await VehicleModel.findById(rawVehicleData._id);
    if (!rawVehicle) return null;
    Object.assign(rawVehicle, { ...rawVehicleData });
    rawVehicle.save();
    return MongooseVehicleMapper.toDomain(rawVehicle);
  }

  public async delete(id: string) {
    await VehicleModel.deleteOne({ _id: id });
  }
}

export { MongooseVehicleRepository };
