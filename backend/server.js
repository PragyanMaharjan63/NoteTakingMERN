import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/connectdb.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
configDotenv();
const PORT = process.env.PORT;
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
