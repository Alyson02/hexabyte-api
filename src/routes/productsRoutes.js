import { Router } from 'express';
import {getProducts, postProduct, editProduct, deleteProduct} from "../controllers/productsController.js"
const productsRouter = Router();

productsRouter.get("/" , getProducts);
productsRouter.get("/:id" , getProducts);
productsRouter.post("/" , postProduct)
productsRouter.put("/:id" , editProduct);
productsRouter.delete("/:id" , deleteProduct);

export default productsRouter;



