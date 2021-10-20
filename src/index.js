// importing packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import passport from "passport";

dotenv.config();

import logger from "./logger";

// response function
import response from "./utils/response";

// routes
import { authRoutes, userRoutes } from "./routes";

// connecting to database
import "./database";

// passport strategies
import "./local.passport";
import "./jwt.passport";

// init app
const app = express();

// setting port
const port = process.env.PORT || 5000;

// middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// routes
app.use("/auth", authRoutes);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoutes);

// 404 error handling
app.use("/*", (req, res, next) => {
  const err = new Error("Path not found");
  next(err);
});

// global error handler
app.use((err, req, res, next) => {
  logger.error(err);

  if (err.message === "Path not found")
    return response(res, null, "Path not found", true, 404);

  response(res, null, "Internal error. Sorry!!!", true, 500);
});

app.listen(port, logger.info(`Server running on ${port}`));
