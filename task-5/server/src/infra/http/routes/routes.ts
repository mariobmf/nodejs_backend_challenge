import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { VehiclesController } from "../controllers/vehicles.controller";
import { ChangeVehicleDataController } from "../controllers/change-vehicle-data.controller";
import validateIdMiddleware from "../middlewares/validate-id.middleware";

const vehiclesController = new VehiclesController();
const changeVehicleDataController = new ChangeVehicleDataController();

const routes = Router();

const validBrands = [
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
];

routes.get(
  "/veiculos/find",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      veiculo: Joi.string(),
      marca: Joi.string().valid(...validBrands),
      ano: Joi.number().integer(),
      descricao: Joi.string(),
      vendido: Joi.boolean(),
    }),
  }),
  vehiclesController.listAllByQuery
);

routes.post(
  "/veiculos",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      veiculo: Joi.string().required(),
      marca: Joi.string()
        .valid(...validBrands)
        .required(),
      ano: Joi.number().integer().required(),
      descricao: Joi.string().required(),
    }),
  }),
  vehiclesController.create
);

routes.get("/veiculos", vehiclesController.listAll);

routes.get(
  "/veiculos/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  validateIdMiddleware,
  vehiclesController.show
);

routes.put(
  "/veiculos/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      veiculo: Joi.string().required(),
      marca: Joi.string()
        .valid(...validBrands)
        .required(),
      ano: Joi.number().integer().required(),
      descricao: Joi.string().required(),
      vendido: Joi.boolean().required(),
    }),
  }),
  validateIdMiddleware,
  vehiclesController.update
);

routes.delete(
  "/veiculos/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  validateIdMiddleware,
  vehiclesController.delete
);

routes.patch(
  "/veiculos/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      veiculo: Joi.string(),
      marca: Joi.string().valid(...validBrands),
      ano: Joi.number().integer(),
      descricao: Joi.string(),
      vendido: Joi.boolean(),
    }),
  }),
  validateIdMiddleware,
  changeVehicleDataController.update
);

export { routes };
