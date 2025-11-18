import express from "express";
import authController from "../controllers/auth.controller.js";

const AuthRouter = express.Router();

// REST API
AuthRouter.post("/auth/signin", authController.signin);
AuthRouter.get("/auth/signout", authController.signout);

export default AuthRouter;
