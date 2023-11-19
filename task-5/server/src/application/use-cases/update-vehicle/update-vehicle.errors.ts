import { UseCaseError } from "../../../shared/core/app-error";

export class VehicleNotFound extends Error implements UseCaseError {
  constructor() {
    super(`Vehicle not found`);
    this.message = "Vehicle not found";
  }
}
