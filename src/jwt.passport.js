import passportJWT from "passport-jwt";
import passport from "passport";

// secret key
import { secret } from "./config/secretKey";

// user model
import { findUserById } from "./methods/user";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// logic
const logic = async (jwtPayload, cb) => {
  try {
    let user = await findUserById(jwtPayload.id);
    // if user not found
    if (!user) return cb(new Error("user not found"), null);

    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    logic
  )
);
