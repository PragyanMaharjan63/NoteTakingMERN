import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/connectdb.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/notesRouter.js";
configDotenv();
const PORT = process.env.PORT;
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://note-taking-mern-1w1w.vercel.app", // your deployed frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.options("/api/", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
