// importing package
import mongoose from "mongoose";
import MONGODB_URL from "./config/mongoURL";

// connecting to db
mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("database is connected..."))
    .catch((err) => console.log(err));
