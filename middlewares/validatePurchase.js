import { ObjectId } from 'mongodb';

import db from './../db.js';

export async function validatePurchase (req,res,next) {

  try {

    const { products } = req.body;

    let totalPrice = 0;

    for (let product of products){
      const productFound = await db.collection('products').findOne({ _id: new ObjectId (product._id) });
      if (!productFound) return res.status(404).send(`Produto "${product._id}" não encontrado`);
      totalPrice += product.price * product.quantity;
    }
   
    res.locals.totalPrice = totalPrice;
    
    next();   
    
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } 
}

export async function validatePurchaseId (req,res,next) {
  try {
    const id   = req.params.id;

    const purchase = await db.collection('purchases').findOne({ _id: new ObjectId(id) });
    
    if (!purchase) return res.status(404).send(`Pedido ${id} não encontrado`);

    res.locals.purchase = purchase;

    next();

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } 
}