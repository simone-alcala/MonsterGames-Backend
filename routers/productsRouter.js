import { Router } from 'express';

import { validateProduct } from "../schemas/productSchema.js";
import { addProduct } from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.post('/products', validateProduct, addProduct);

export default productsRouter;