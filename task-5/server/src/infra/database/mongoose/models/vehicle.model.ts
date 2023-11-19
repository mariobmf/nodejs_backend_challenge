import mongoose from "mongoose";
import { BrandType } from "../../../../application/entities/vehicle.entity";

export type MongooseVehicle = {
  _id: string;
  veiculo: string;
  ano: number;
  descricao: string;
  marca: BrandType;
  vendido: boolean;
  created: Date;
  updated: Date;
};

const schema = new mongoose.Schema<MongooseVehicle>(
  {
    veiculo: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      enum: [
        "Toyota",
        "Volkswagen",
        "Hyundai",
        "Ford",
        "Honda",
        "Nissan",
        "Chevrolet",
        "Kia",
        "Fiat",
        "BMW",
      ],
      required: true,
    },
    ano: {
      type: Number,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    vendido: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

const VehicleModel = mongoose.model<MongooseVehicle>("Vehicle", schema);

export { VehicleModel };
