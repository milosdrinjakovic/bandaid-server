const config = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


const textRouter = require("./controllers/text")

const apiText = "/api/text";

app.use(cors())

mongoose.set("strictQuery", false);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log("Conected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error.message)
    })

app.use(express.json());


app.use(apiText, textRouter)
app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`);
  });