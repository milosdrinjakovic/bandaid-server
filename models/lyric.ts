import { model, Schema } from "mongoose";

export type TLyric  = {
  id: String
  title: String
  content: String
  dateCreated?: Date
  dateModified?: Date
}

export interface ILyric extends TLyric  {}

const lyricSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
  },
  dateModified: {
    type: Date,
  },
});

const Lyric = model<ILyric>("Lyric", lyricSchema);

export default Lyric;