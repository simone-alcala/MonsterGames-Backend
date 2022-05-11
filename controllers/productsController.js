import db from "../db.js";

export async function addProduct(req,res){
  const product = req.body;

  try {
    await db.collection('products').insertOne(product);
    
    return res.status(201).send(product);

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}