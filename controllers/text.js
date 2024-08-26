const express = require('express');
const textRouter = express.Router();
const textModel = require("../models/textModel");



textRouter.get("/",async(request,response) => {
    const text = await textModel.find({});
    response.json(text);
})


textRouter.post("/",async(request,response) => {
    const body = request.body;

    const text = new textModel({
        content: body.content
    })

    const savedText = await text.save();

    response.status(201)
})

module.exports = textRouter;