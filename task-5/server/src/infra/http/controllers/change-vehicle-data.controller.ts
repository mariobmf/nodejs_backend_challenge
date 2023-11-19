import { Request, Response } from "express";
import { MongooseVehicleRepository } from "../../database/mongoose/repositories/mongoose-vehicle.repository";
import {
  ChangeVehicleDataUseCase,
  ChangeVehicleDataErrors,
} from "../../../application/use-cases/change-vehicle-data";
import { VehicleViewModel } from "../view-models/vehicle.view-model";

class ChangeVehicleDataController {
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const vehicleData = req.body;
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const changeVehicleDataUseCase = new ChangeVehicleDataUseCase(
      mongooseVehicleRepository
    );

    const useCaseResponse = await changeVehicleDataUseCase.execute({
      id,
      ...vehicleData,
    });

    if (useCaseResponse.isSuccess()) {
      return res
        .status(200)
        .json(VehicleViewModel.toHTTP(useCaseResponse.value));
    }
    const error = useCaseResponse.value;
    const message = error.message;
    if (error.constructor === ChangeVehicleDataErrors.VehicleNotFound)
      return res.status(404).json({
        status: "error",
        error: "code.not_found",
        message: message,
      });
  }
}

export { ChangeVehicleDataController };
