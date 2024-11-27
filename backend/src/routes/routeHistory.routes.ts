import { Router } from "express";
import { GetRouteHistoryController } from "../modules/ride/routeHistory/useCases/getRouteHistory/getRouteHistoryController";

const routeHistoryRoutes = Router();
const getRouteHistoryController = new GetRouteHistoryController();

routeHistoryRoutes.get("/:customer_id", getRouteHistoryController.handle);
routeHistoryRoutes.get("/", getRouteHistoryController.handle);

export { routeHistoryRoutes };
