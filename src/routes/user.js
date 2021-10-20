import { Router } from "express";
import { userController } from "../controllers";

const routes = Router();

// get user data
routes.get("/", userController.getUser);

export default routes;
