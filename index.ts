import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { teleprompterRouter, teleprompterPath } from "./src/router";
import { config } from "./utils/config"

const app = express();

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
    mongoose
        .connect(config.MONGODB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB", error.message)
        })

    app.use(express.json());
    app.use(cors())
    app.use(teleprompterPath, teleprompterRouter)
}
const server = app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`);
});


export default server;