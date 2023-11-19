import { Request, Response } from "express";
import { MongooseVehicleRepository } from "../../database/mongoose/repositories/mongoose-vehicle.repository";
import { CreateVehicleUseCase } from "../../../application/use-cases/create-vehicle";
import { VehicleRepository } from "../../../application/repositories/vehicle-repository.interface";
import { VehicleViewModel } from "../view-models/vehicle.view-model";
import {
  ShowVehicleErrors,
  ShowVehicleUseCase,
} from "../../../application/use-cases/show-vehicle";
import { ListVehiclesUseCase } from "../../../application/use-cases/list-vehicles";
import { ListVehiclesByQueryUseCase } from "../../../application/use-cases/list-vehicles-by-query";
import {
  UpdateVehicleErrors,
  UpdateVehicleUseCase,
} from "../../../application/use-cases/update-vehicle";
import {
  DeleteVehicleErrors,
  DeleteVehicleUseCase,
} from "../../../application/use-cases/delete-vehicle";

class VehiclesController {
  public async create(req: Request, res: Response) {
    const { veiculo, marca, ano, descricao } = req.body;
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const createVehicleUseCase = new CreateVehicleUseCase(
      mongooseVehicleRepository
    );
    const useCaseResponse = await createVehicleUseCase.execute({
      veiculo,
      marca,
      ano,
      descricao,
    });
    return res
      .status(201)
      .json(
        useCaseResponse.value && VehicleViewModel.toHTTP(useCaseResponse.value)
      );
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const showVehicleUseCase = new ShowVehicleUseCase(
      mongooseVehicleRepository
    );
    const useCaseResponse = await showVehicleUseCase.execute({ id });
    if (useCaseResponse.isSuccess()) {
      return res
        .status(200)
        .json(VehicleViewModel.toHTTP(useCaseResponse.value));
    }
    const error = useCaseResponse.value;
    const message = error.message;
    if (error.constructor === ShowVehicleErrors.VehicleNotFound)
      return res.status(404).json({
        status: "error",
        error: "code.not_found",
        message: message,
      });
  }

  public async listAll(req: Request, res: Response) {
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const listVehiclesUseCase = new ListVehiclesUseCase(
      mongooseVehicleRepository
    );
    const useCaseResponse = await listVehiclesUseCase.execute();
    return res
      .status(200)
      .json(
        useCaseResponse.value
          ? useCaseResponse.value.map(VehicleViewModel.toHTTP)
          : []
      );
  }

  public async listAllByQuery(req: Request, res: Response) {
    const { query } = req;
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const listVehiclesByQueryUseCase = new ListVehiclesByQueryUseCase(
      mongooseVehicleRepository
    );
    const useCaseResponse = await listVehiclesByQueryUseCase.execute(query);
    res
      .status(200)
      .json(
        useCaseResponse.value
          ? useCaseResponse.value.map(VehicleViewModel.toHTTP)
          : []
      );
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { veiculo, marca, ano, descricao, vendido } = req.body;
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const updateVehicleUseCase = new UpdateVehicleUseCase(
      mongooseVehicleRepository
    );
    const useCaseResponse = await updateVehicleUseCase.execute({
      id,
      veiculo,
      marca,
      ano,
      descricao,
      vendido,
    });
    if (useCaseResponse.isSuccess()) {
      return res
        .status(200)
        .json(VehicleViewModel.toHTTP(useCaseResponse.value));
    }
    const error = useCaseResponse.value;
    const message = error.message;
    if (error.constructor === UpdateVehicleErrors.VehicleNotFound)
      return res.status(404).json({
        status: "error",
        error: "code.not_found",
        message: message,
      });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const mongooseVehicleRepository = new MongooseVehicleRepository();
    const deleteVehicleUseCase = new DeleteVehicleUseCase(
      mongooseVehicleRepository
    );
    const useCaseResponse = await deleteVehicleUseCase.execute({ id });
    if (useCaseResponse.isSuccess()) {
      return res.status(200).send();
    }
    const error = useCaseResponse.value;
    const message = error.message;
    if (error.constructor === DeleteVehicleErrors.VehicleNotFound)
      return res.status(404).json({
        status: "error",
        error: "code.not_found",
        message: message,
      });
  }
}

export { VehiclesController };
