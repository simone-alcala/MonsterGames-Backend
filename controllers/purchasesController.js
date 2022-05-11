import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import db from './../db.js';

export async function addPurchase (req,res) {
  
  try {

    const user  = res.locals.registeredUser;
    const total = res.locals.totalPrice;

    const { products,paymentInfo,sendTo } = req.body;

    const newPurchase = await db.collection('purchases').insertOne({ 
      products,
      paymentInfo,
      sendTo,
      totalPrice: total,
      userId:     user._id,
      userEmail:  user.email,
      date:       dayjs().format('DD/MM/YYYY')
    });

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
    return res.status(200).send(purchases.reverse());
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getPurchaseById (req,res) {
  try {
    return res.status(200).send(res.locals.purchase);
  } catch(e) {
    console.log(e);
    return res.sendStatus(500);
  }
}