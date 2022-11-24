import { signin, signup } from "../controllers/authController.js";
import signupValidationMiddleware from "../middlewares/signupValidationMiddleware.js";
import signinValidationMiddleware from "../middlewares/signinValidationMiddleware.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", signupValidationMiddleware, signup);
authRouter.post("/signin", signinValidationMiddleware, signin);

export default authRouter;
