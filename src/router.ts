import express from "express";
import { getLyricById, getLyrics, createLyric, updateLyric } from "./controller";

export const teleprompterRouter = express.Router();
export const teleprompterPath = "/api/teleprompter";

teleprompterRouter.get("/", getLyrics);
teleprompterRouter.post("/", createLyric);  
teleprompterRouter.get("/:id", getLyricById); 
teleprompterRouter.put("/:id", updateLyric); 