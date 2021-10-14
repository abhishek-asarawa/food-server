// importing packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// response function
import response from "./utils/response";

// routes

// connecting to database

// passport strategies

dotenv.config();

// init app
const app = express();

// setting port
const port = process.env.PORT || 5000;

// middleware
app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

// 404 error handling
app.use("/*", (req, res, next) => {
    const err = new Error("Path not found");
    next(err);
});

// global error handler
app.use((err, req, res, next) => {
    console.log("global error handler ==>>", err);

    if (err.message === "Path not found")
        return response(res, null, "Path not found", true, 404);

    response(res, null, "Internal error. Sorry!!!", true, 500);
});

app.listen(port, console.log(`Server running on ${port}`));