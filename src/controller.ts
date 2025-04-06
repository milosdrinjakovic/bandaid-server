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

export const updateLyricsOrder = async (req: Request, res: Response) => {
  try {
    const orderedLyricIds = req.body;

    if (!Array.isArray(orderedLyricIds)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    for (let i = 0; i < orderedLyricIds.length; i++) {
      await Lyric.findByIdAndUpdate(orderedLyricIds[i], { order: i }); 
    }

    res.status(200).json({ message: "Lyrics order updated successfully" });
  } catch (error) {
    console.error("Error updating lyrics order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createLyric = async (request: Request, response: Response) => {
  let lyric: TLyric = new Lyric();
  try {
    const { title, content, scrollSpeed } = request.body;
    //Is there a better way to find the next order number of the lyric?
    const lyrics = await Lyric.find({});
    const orderId = lyrics.length + 1;
    
    const obj: TLyric = {
      title: title,
      content: content,
      scrollSpeed: scrollSpeed,
      dateCreated: new Date(),
      order: orderId
    }
  
    lyric = await new Lyric(obj).save();
    response.status(201).json(lyric);
  } catch (error) {
    console.error("There was an error when creating a new lyric: ", error.message)
    response.status(500).json(null)
  }
};

export const deleteLyric = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    await Lyric.findByIdAndDelete(id);
    response.status(200).json({ message: "Lyric deleted sucessfully"});
  }
  catch (error) {
    console.error("There was an error when deleting a lyric: ", error.message)
    response.status(500).json(null)
  }
}

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
    const { title, content, scrollSpeed } = request.body;
    lyric = await Lyric.findByIdAndUpdate(request.params.id, {
      title: title,
      content: content,
      scrollSpeed: scrollSpeed,
      dateModified: new Date()
    })
    
    response.status(201).json(lyric);
  } catch (error) {
    console.error("There was an error when creating a new lyric: ", error.message)
    response.status(500).json(null)
  }
}
