import { Request, Response } from "express";
import Lyric, { TLyric } from "../models/lyric";
import { randomUUID } from "crypto";

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
    const body = request.body;

    lyric = await  new Lyric({
      id: randomUUID(),
      title: body.title,
      content: body.content,
      dateCreated: new Date()
    }).save();
    
  } catch (error) {
    console.error("There was an error when creating a new lyric: ", error.message)
  }
    response.status(201).json(lyric);
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
