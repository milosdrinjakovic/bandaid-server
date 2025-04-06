import { model, Schema } from "mongoose";

export type TLyric  = {
  title: String
  content: String
  scrollSpeed?: Number
  dateCreated?: Date
  dateModified?: Date
  order?: number
}

export interface ILyric extends TLyric  {}

const lyricSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  scrollSpeed: {
    type: Number,
    required: false
  },
  dateCreated: {
    type: Date,
  },
  dateModified: {
    type: Date,
  },
  order: {
    type: Number
  }
});

const Lyric = model<ILyric>("Lyric", lyricSchema);

export default Lyric;