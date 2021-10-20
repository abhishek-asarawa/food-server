import { Router } from "express";
import { userController } from "../controllers";
import { getIdFromJWT } from "../middlewares/custom";

const routes = Router();

// get user data
routes.get("/", getIdFromJWT, userController.getUser);

export default routes;
