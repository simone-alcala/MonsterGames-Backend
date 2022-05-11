import db from "../db.js";
import {ObjectId} from "mongodb";

export async function validateId(req,res,next){
  const {id} = req.params;
  
  if(id.length!==24){
    return res.status(422).send('ID inválida');
  }

  try {
    const productsArray = await db.collection('products').find().toArray();

    const selectedProduct = await db.collection('products').findOne({_id: ObjectId(id)});

    if(!selectedProduct){
      return res.status(404).send('Produto não encontrado');
    }

    res.locals.selectedProduct = selectedProduct;
    next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}