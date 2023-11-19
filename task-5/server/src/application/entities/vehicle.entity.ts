import { UniqueEntityID } from "../../shared/entities/UniqueEntityID";
import { Replace } from "../../shared/helpers/replace";

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
  veiculo: string;
  ano: number;
  descricao: string;
  marca: BrandType;
  vendido: boolean;
  created: Date;
  updated: Date;
}

export class Vehicle {
  private _id: UniqueEntityID;
  private props: VehicleProps;

  constructor(
    VehicleData: Replace<
      VehicleProps,
      { vendido?: boolean; created?: Date; updated?: Date }
    >,
    id?: string
  ) {
    this._id = new UniqueEntityID(id);
    this.props = {
      ...VehicleData,
      vendido: VehicleData.vendido ?? false,
      created: VehicleData.created ?? new Date(),
      updated: VehicleData.updated ?? new Date(),
    };
  }

  public get id(): UniqueEntityID {
    return this._id;
  }

  public get veiculo(): string {
    return this.props.veiculo;
  }

  public set veiculo(veiculo: string) {
    this.props.veiculo = veiculo;
  }

  public get ano(): number {
    return this.props.ano;
  }

  public set ano(ano: number) {
    this.props.ano = ano;
  }

  public get descricao(): string {
    return this.props.descricao;
  }

  public set descricao(descricao: string) {
    this.props.descricao = descricao;
  }

  public get marca(): BrandType {
    return this.props.marca;
  }

  public set marca(marca: BrandType) {
    this.props.marca = marca;
  }

  public get vendido(): boolean {
    return this.props.vendido;
  }

  public set vendido(vendido: boolean) {
    this.props.vendido = vendido;
  }

  public get created(): Date {
    return this.props.created;
  }

  public get updated(): Date {
    return this.props.updated;
  }
}
