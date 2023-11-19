import "dotenv/config";
import "express-async-errors";

import express, { NextFunction, Request, Response, Express } from "express";
import cors from "cors";
import { Server } from "node:http";
import { errors } from "celebrate";
import swaggerUI from "swagger-ui-express";
import { routes } from "./routes/routes";
import swaggerDocs from "../../swagger.json";
import mongoClient from "../database/mongoose";

class App {
  private app: Express;

  private server: Server | undefined;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandling();
    this.databases();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    this.app.use(routes);
  }

  databases() {
    mongoClient.connect();
  }

  errorHandling() {
    this.app.use(errors());
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        console.log(err);
        return response
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    );
  }

  gracefulShutdown(event: string) {
    return (code: number) => {
      if (this.server) {
        this.server.close(async () => {
          await mongoClient.disconnect();
          console.log("http server closed successfully");
          process.exit(0);
        });
      }
    };
  }

  serverListen(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

export { App };
