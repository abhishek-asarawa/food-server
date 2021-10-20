import { Router } from "express";
import { userController } from "../controllers";
import { userValidation } from "../middlewares/validators";
import checkValidationError from "../middlewares/validators/checkValidationError";

const routes = Router();

// add user
routes.post(
  "/signup",
  userValidation.signIn,
  checkValidationError,
  userController.addUser
);

routes.post("/sign-in", userController.loginUser);

export default routes;
