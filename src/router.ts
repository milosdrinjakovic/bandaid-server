import express from "express";
import { createText, createUserData, deleteText, getTextById, getTextsByUserId, getUserData, updateText, updateTextsOrder } from "./controller";

export const teleprompterRouter = express.Router();
export const teleprompterPath = "/api/teleprompter";

teleprompterRouter.get("/", getUserData);
teleprompterRouter.post("/", createUserData);  

teleprompterRouter.get("/texts", getTextsByUserId);
teleprompterRouter.post("/texts", createText);
teleprompterRouter.put("/texts", updateTextsOrder);
teleprompterRouter.get("/texts/:id", getTextById); 
teleprompterRouter.put("/texts/:id", updateText); 
teleprompterRouter.delete("/texts/:id", deleteText); 