import { Router } from "express";
import { create } from "../controllers/checkoutController.js";
import authMiddleware from "../middlewares/authMidlleware.js";
import checkoutValidation from "../middlewares/checkoutMiddleware.js";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", authMiddleware, checkoutValidation, create);

export default checkoutRouter;
