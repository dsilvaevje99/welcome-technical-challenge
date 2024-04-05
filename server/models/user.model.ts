import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: String,
  role: { type: String, default: "user" },
  checked_out: {
    type: [
      { book: { type: Schema.Types.ObjectId, ref: "Book" }, timestamp: Date },
    ],
    default: [],
  },
  history: {
    type: [
      { book: { type: Schema.Types.ObjectId, ref: "Book" }, timestamp: Date },
    ],
    default: [],
  },
});

UserSchema.index({
  email: "text",
});

export const User = model("User", UserSchema);
