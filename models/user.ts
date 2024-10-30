import { model, Schema } from "mongoose";

export type TUser = {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface IUser extends TUser  {}

const userSchema: Schema = new Schema({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },

  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;