import { Router } from "express";
import { GetDriversController } from "../modules/drivers/useCases/getDriver/getDriverController";

const driversRoutes = Router();
const getDriverController = new GetDriversController();

driversRoutes.get("/", getDriverController.handle);

export { driversRoutes };
