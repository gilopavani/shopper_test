import { Router } from "express";
import { driversRoutes } from "./drivers.routes";
import { estimateRoutes } from "./estimate.routes";

const routes = Router();

routes.use("/drivers", driversRoutes);
routes.use("/ride", estimateRoutes);

export { routes };
