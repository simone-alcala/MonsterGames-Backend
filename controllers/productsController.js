import db from "../db.js";

export async function addProduct(req,res){
  const product = req.body;

  try {
    const gamesArray = await db.collection('products').find().toArray();
    let alreadyAdded = false;

    gamesArray.map(game => {
      if(game.name === product.name){
        alreadyAdded = true;
      }
    })

    if(alreadyAdded){
      return res.status(409).send('Jogo já cadastrado!');
    }

    await db.collection('products').insertOne(product);
    
    return res.status(201).send(product);

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getProducts(req,res){
  const {genre} = req.query

  try {

    if(genre){
      let filteredProducts = await db.collection('products').find({ $or: [
        { genre: { '$regex' : genre , '$options' :'i' } },
        { name:  { '$regex' : genre , '$options' :'i' } }
      ]}).toArray();

      filteredProducts = filteredProducts.filter((product) => {
        return product.stock!==0
      })
      return res.status(200).send(filteredProducts);
    }

    let productsArray = await db.collection('products').find().toArray();
    
    productsArray = productsArray.filter((product) => {
      return product.stock!==0
    })

    return res.status(200).send(productsArray);

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export function getSpecificProduct(req,res){
  const {selectedProduct} = res.locals

  return res.send(selectedProduct);
}