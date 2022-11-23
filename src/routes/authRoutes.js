import { signup } from "../controllers/authController.js";
import signupValidationMiddleware from "../middlewares/signupValidationMiddleware.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", signupValidationMiddleware, signup);

export default authRouter;