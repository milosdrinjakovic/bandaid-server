import express from "express";
import { getLyricById, getLyrics, createLyric, updateLyric, updateLyricsOrder, deleteLyric } from "./controller";

export const teleprompterRouter = express.Router();
export const teleprompterPath = "/api/teleprompter";

teleprompterRouter.get("/", getLyrics);
teleprompterRouter.post("/", createLyric);  
teleprompterRouter.put("/", updateLyricsOrder);
teleprompterRouter.get("/:id", getLyricById); 
teleprompterRouter.put("/:id", updateLyric); 
teleprompterRouter.delete("/:id", deleteLyric); 
