import passport from "passport";
import jwt from "jsonwebtoken";

import { secret } from "../config/secretKey";
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

export const loginUser = (req, res, next) => {
  try {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }

        if (!user)
          return response(
            res,
            null,
            info.msg ? info.msg : "Credentials incorrect",
            true,
            404
          );

        req.login(user, { session: false }, (err) => {
          if (err) return next(err);

          // generate a signed json web token with the contents of user object and return it in the response
          const { _id } = user;
          const token = jwt.sign({ id: _id }, secret);

          return response(res, { user, token }, "Login Successful", false, 200);
        });
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};
