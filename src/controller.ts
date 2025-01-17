import { Request, Response } from "express";
import Lyric, { TLyric } from "../models/lyric";

export const getLyrics = async (_request: Request, response: Response) => {
    let lyrics = new Array<TLyric>();
  try {
    lyrics = await Lyric.find({});
  } catch (error) {
    console.error("There was an error when getting lyrics: ", error.message)
  }
  response.status(200).json(lyrics);
};

export const createLyric = async (request: Request, response: Response) => {
  let lyric: TLyric = new Lyric();
  try {
    const { title, content } = request.body;
    const obj: TLyric = {
      title: title,
      content: content,
      dateCreated: new Date()
    }
    console.log({obj})
    lyric = await new Lyric(obj).save();
    response.status(201).json(lyric);
  } catch (error) {
    console.error("There was an error when creating a new lyric: ", error.message)
    response.status(500).json(null)
  }
};

export const getLyricById = async (request: Request, response: Response) => {
  let lyric: TLyric | null = new Lyric();
  try {
    lyric = await Lyric.findById(request.params.id);
  } catch (error) {
    console.error("There was an error when getting a lyric: ", error.message)
  }
  response.status(200).json(lyric);
};

export const updateLyric = async (request: Request, response: Response) => {
  let lyric: TLyric | null = new Lyric();
  try {
    const { title, content } = request.body;
    lyric = await Lyric.findByIdAndUpdate(request.params.id, {
      title: title,
      content: content,
      dateModified: new Date()
    })
    
    response.status(201).json(lyric);
  } catch (error) {
    console.error("There was an error when creating a new lyric: ", error.message)
    response.status(500).json(null)
  }
}
