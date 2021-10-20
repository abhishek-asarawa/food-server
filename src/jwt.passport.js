import passportJWT from "passport-jwt";
import passport from "passport";
import path from "path";
import { readFileSync } from "fs";

// user model
import { findUserById } from "./methods/user";

// secret key
const publicKeyPath = path.join(__dirname, "../accessPublic.key");

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
      secretOrKey: readFileSync(publicKeyPath),
    },
    logic
  )
);
