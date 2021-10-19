import { userMethods } from "../methods";
import funcWrapper from "../utils/funcWrapper";
import response from "../utils/response";

export const addUser = funcWrapper(async (req, res, next) => {
  const { email, firstName, lastName, dob, password } = req.body;
  const createdUser = await userMethods.add({
    email,
    firstName,
    lastName,
    dob,
    password,
  });

  response(res, createdUser, "User created successfully");
});
