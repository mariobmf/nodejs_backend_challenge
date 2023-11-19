import { App } from "./infra/http/app";

import "dotenv/config";

const app = new App();
const port = Number(process.env.PORT) || 3333;
app.serverListen(port);
process.on("SIGINT", app.gracefulShutdown("SIGINT"));
process.on("SIGTERM", app.gracefulShutdown("SIGTERM"));
