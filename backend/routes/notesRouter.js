import express from "express";
import cors from "cors";
import { authMiddleware } from "../controllers/authControllers.js";
import {
  deleteNotes,
  getNotes,
  setNotss,
  updateNote,
} from "../controllers/notesController.js";

const noteRouter = express.Router();
noteRouter.use(cors(crossOptions));
noteRouter.get("/getnotes", authMiddleware, getNotes);
noteRouter.post("/setnotes", authMiddleware, setNotss);
noteRouter.post("/deletenote/:id", authMiddleware, deleteNotes);
noteRouter.put("/setnotes/:id", authMiddleware, updateNote);
export default noteRouter;
