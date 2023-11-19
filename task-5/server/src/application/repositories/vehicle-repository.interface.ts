import { BrandType, Vehicle } from "../entities/vehicle.entity";

export interface FindByQueryDTO {
  veiculo?: string;
  ano?: number;
  descricao?: string;
  marca?: BrandType;
  vendido?: boolean;
}

export interface VehicleRepository {
  create: (data: Vehicle) => Promise<Vehicle>;
  findAll: () => Promise<Vehicle[]>;
  findByQuery: (query: FindByQueryDTO) => Promise<Vehicle[]>;
  findById: (id: string) => Promise<Vehicle | null>;
  update: (vehicle: Vehicle) => Promise<Vehicle | null>;
  delete: (id: string) => Promise<void>;
}
