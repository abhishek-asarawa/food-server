// importing packages
import passport from "passport";
import local from "passport-local";
import bcrypt from "bcrypt";
import { findUserByEmail } from "./methods/user";

// local strategy
const LocalStrategy = local.Strategy;

const isValidPass = (inputPass, savedPass) =>
  bcrypt.compare(inputPass, savedPass);

const logic = async (email, password, cb) => {
  try {
    const user = await findUserByEmail(email);

    // if user not found
    if (!user)
      return cb(null, false, {
        msg: `No user found with email - ${email}`,
        isError: true,
        data: null,
      });

    const isPassMatched = await isValidPass(password, user.password);

    if (!isPassMatched)
      return cb(null, false, {
        msg: "Incorrect username or password",
        isError: true,
        data: null,
      });

    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // if user found
    return cb(null, user, {
      msg: "Logged In Successfully",
      isError: false,
      data,
    });
  } catch (err) {
    cb(err);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    logic
  )
);
