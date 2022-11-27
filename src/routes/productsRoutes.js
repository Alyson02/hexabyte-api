import { Router } from 'express';
import {getProducts, postProduct, editProduct, deleteProduct, getProductsbyId} from "../controllers/productsController.js"
const productsRouter = Router();

productsRouter.get("/" , getProducts);
productsRouter.get("/:id" , getProductsbyId);
productsRouter.post("/" , postProduct)
productsRouter.put("/:id" , editProduct);
productsRouter.delete("/:id" , deleteProduct);

export default productsRouter;



//