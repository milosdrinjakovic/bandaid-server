const express = require("express");
const textRouter = express.Router();
const textModel = require("../models/textModel");

textRouter.get("/", async (request, response) => {
  const text = await textModel.find({});
  response.json(text);
});

textRouter.post("/", async (request, response) => {
  const body = request.body;

  const text = new textModel({
    content: body.content,
  });

  const savedText = await text.save();

  response.status(201).json(savedText);
});

textRouter.get("/:id", async (request, response) => {
  const textById = await textModel.findById(request.params.id);
  response.status(201).json(textById);
}); 

module.exports = textRouter;
