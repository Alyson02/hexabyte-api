import { Router } from "express";
import {
  getProducts,
  postProduct,
  editProduct,
  deleteProduct,
  getProductsbyId,
  getAllProducts,
} from "../controllers/productsController.js";
import authMiddleware from "../middlewares/authMidlleware.js";
const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductsbyId);
productsRouter.post("/", authMiddleware, postProduct);
productsRouter.put("/:id", authMiddleware, editProduct);
productsRouter.delete("/:id", authMiddleware, deleteProduct);
productsRouter.get("/products/admin", getAllProducts);

export default productsRouter;

//
