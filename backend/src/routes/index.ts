import { Router } from "express";
import { driversRoutes } from "./drivers.routes";
import { estimateRoutes } from "./estimate.routes";
import { confirmRoutes } from "./confirm.routes";
import { routeHistoryRoutes } from "./routeHistory.routes";

const routes = Router();

routes.use("/drivers", driversRoutes);
routes.use("/ride", estimateRoutes);
routes.use("/ride", confirmRoutes);
routes.use("/ride", routeHistoryRoutes);

export { routes };
