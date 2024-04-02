import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: String,
  checked_out: [
    { book: { type: Schema.Types.ObjectId, ref: "Book" }, timestamp: Date },
  ],
  history: [
    { book: { type: Schema.Types.ObjectId, ref: "Book" }, timestamp: Date },
  ],
});

UserSchema.index({
  email: "text",
});

export const User = model("User", UserSchema);
