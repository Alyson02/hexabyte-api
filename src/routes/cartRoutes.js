import { Router } from "express";
import {
  addProduct,
  createCart,
  getProdutos,
  removeProduct,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMidlleware.js";

const cartRouter = Router();

cartRouter.post("/cart", authMiddleware, createCart);
cartRouter.post("/cart/addproduct", authMiddleware, addProduct);
cartRouter.get("/cart/product", authMiddleware, getProdutos);
cartRouter.delete("/cart/remove/:idProduto", authMiddleware, removeProduct);

export default cartRouter;
