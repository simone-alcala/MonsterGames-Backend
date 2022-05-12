import bcrypt from "bcrypt";

import db from './../db.js';

export async function validateSignIn (req,res,next){
  const {email, password} = req.body;

  try{
    const user = await db.collection('users').findOne({email});

    if(!(user && bcrypt.compareSync(password, user.password))){
      return res.status(404).send("Usuário não encontrado");
    }

    res.locals.avatar = user.avatar;
    res.locals.name = user.name;
    res.locals.userId = user._id;
    res.locals.avatar = user.avatar;
    next();

  }catch(e){
    console.log(e);
    return res.sendStatus(500);
  }
}