import { Router } from "express";
import { driversRoutes } from "./drivers.routes";
import { estimateRoutes } from "./estimate.routes";
import { confirmRoutes } from "./confirm.routes";

const routes = Router();

routes.use("/drivers", driversRoutes);
routes.use("/ride", estimateRoutes);
routes.use("/ride", confirmRoutes);

export { routes };
