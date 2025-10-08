import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    console.log(mongoURI);
    await mongoose.connect(mongoURI);

    console.log("connected to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
