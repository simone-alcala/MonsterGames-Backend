import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import db from './../db.js';
import { sendConfirmationEmail } from '../utils/sendConfirmationEmail.js';

export async function addPurchase (req,res) {
  
  const {products} = req.body;
  
  try {

    const user  = res.locals.registeredUser;
    const total = res.locals.totalPrice;

    const { products,paymentInfo,sendTo } = req.body;

    const newPurchase = await db.collection('purchases').insertOne({ 
      products,
      paymentInfo,
      sendTo,
      totalPrice: total,
      userName:   user.name,
      userId:     user._id,
      userEmail:  user.email,
      date:       dayjs().format('DD/MM/YYYY')
    });

    products.map(async (product) => {
      const selectedProduct = await db.collection('products').findOne({_id: ObjectId(product.productId)});
      await db.collection('products').updateOne({_id: ObjectId(product.productId)}, {$set: {stock: selectedProduct.stock - product.quantity}});
    })

    await db.collection('users').updateOne({_id: ObjectId(user._id)}, {$set: { 
      address: sendTo.address,
      addressNumber: sendTo.addressNumber,
      complement: sendTo.complement,
      neighborhood: sendTo.neighborhood,
      zipCode: sendTo.zipCode,
      city: sendTo.city,
      state: sendTo.state
    }});

    sendConfirmationEmail(newPurchase.insertedId);

    res.status(201).send(newPurchase);

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }

}

export async function getPurchases (req,res) {
  try {
    const user  = res.locals.registeredUser;
    const purchases = await db.collection('purchases').find({userId: new ObjectId(user._id)}).toArray();
    
    purchases.map(purchase => {
      purchase.paymentInfo.cardNumber = purchase.paymentInfo.cardNumber.slice(-4);
      delete purchase.paymentInfo.cvv;
      delete purchase.paymentInfo.cpf;
    });

    return res.status(200).send(purchases.reverse());
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getPurchaseById (req,res) {
  try {
    const purchase = res.locals.purchase;

    purchase.paymentInfo.cardNumber = purchase.paymentInfo.cardNumber.slice(-4);
    delete purchase.paymentInfo.cvv;
    delete purchase.paymentInfo.cpf;

    return res.status(200).send(res.locals.purchase);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
}