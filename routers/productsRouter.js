import { Router } from 'express';

import { validateId } from '../middlewares/validateId.js';
import { validateProduct } from "../schemas/productSchema.js";
import { addProduct, getProducts, getSpecificProduct } from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.get('/products', getProducts);
productsRouter.get('/products/:id', validateId, getSpecificProduct);
productsRouter.post('/products', validateProduct, addProduct);


export default productsRouter;