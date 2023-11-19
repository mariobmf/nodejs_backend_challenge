import {
  Vehicle,
  VehicleProps,
} from "../../application/entities/vehicle.entity";

type Override = Partial<VehicleProps>;

export function makeVehicle(override: Override = {}) {
  return new Vehicle({
    veiculo: "Fusca",
    ano: 1970,
    descricao: "Carro antigo",
    marca: "Volkswagen",
    vendido: false,
    ...override,
  });
}
