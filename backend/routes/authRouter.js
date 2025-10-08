import express from "express";
import { Login, Logout, signup } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/signin", signup);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);

export default authRouter;
