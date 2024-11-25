import { Router } from "express";
import { GetEstimateController } from "../modules/ride/estimate/useCases/getEstimateController";

const estimateRoutes = Router();
const getEstimateController = new GetEstimateController();

estimateRoutes.post("/estimate", getEstimateController.handle);

export { estimateRoutes };
