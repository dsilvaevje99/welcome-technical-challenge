import mongoose from "mongoose";
export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};
