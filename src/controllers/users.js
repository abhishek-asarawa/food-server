import passport from "passport";
import { isEmpty } from "lodash";

import { userMethods } from "../methods";
import funcWrapper from "../utils/funcWrapper";
import response from "../utils/response";
import { getToken } from "../utils/jwt.helper";
import { findUserById } from "../methods/user";

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
          const accessToken = getToken({ id: _id });
          const refreshToken = getToken({ id: _id }, true);

          return response(
            res,
            { user, accessToken, refreshToken },
            "Login Successful",
            false,
            200
          );
        });
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};

// get user details
export const getUser = funcWrapper(async (req, res, next) => {
  const id = req.userId;

  if (!id) return response(res, null, "Null user id found", true, 400);

  const user = await findUserById(id);

  if (isEmpty(user)) return response(res, null, "No user found", true, 404);

  response(res, user, "User data");
});
