import express from "express";
import { authMiddleware } from "../controllers/authControllers.js";
import { getNotes, setNotss } from "../controllers/notesController.js";

const noteRouter = express.Router();

noteRouter.get("/getnotes", authMiddleware, getNotes);
noteRouter.post("/setnotes", authMiddleware, setNotss);

export default noteRouter;
