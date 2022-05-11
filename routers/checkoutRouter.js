import { Router } from 'express';

import { validateSession } from './../middlewares/validateSession.js';
import { schemaProductInfo,schemaPaymentInfo,schemaSendToInfo } from './../schemas/purchaseSchema.js';
import { validatePurchase , validatePurchaseId} from './../middlewares/validatePurchase.js'
import { addPurchase,getPurchases,getPurchaseById } from './../controllers/purchasesController.js';

const checkoutRouter = Router();

checkoutRouter.post('/checkout', 
  validateSession,
  schemaProductInfo, schemaSendToInfo, schemaPaymentInfo, validatePurchase, 
  addPurchase );

  checkoutRouter.get('/checkout', validateSession,  getPurchases );
  checkoutRouter.get('/checkout/:id', validateSession, validatePurchaseId, getPurchaseById );

export default checkoutRouter;