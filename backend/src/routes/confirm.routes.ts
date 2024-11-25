import { Router } from "express";
import { SetConfirmController } from "../modules/ride/confirm/useCases/setConfirmController";

const confirmRoutes = Router();
const setConfirmController = new SetConfirmController();

confirmRoutes.post("/confirm", setConfirmController.handle);
confirmRoutes.patch("/confirm", setConfirmController.handle);

export { confirmRoutes };
