export type BrandType =
  | "Toyota"
  | "Volkswagen"
  | "Hyundai"
  | "Ford"
  | "Honda"
  | "Nissan"
  | "Chevrolet"
  | "Kia"
  | "Fiat"
  | "BMW";

export interface VehicleProps {
  id: string;
  veiculo: string;
  ano: number;
  descricao: string;
  marca: BrandType;
  vendido: boolean;
  created: string;
  updated: string;
}
