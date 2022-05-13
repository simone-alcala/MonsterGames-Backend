import dotenv from 'dotenv';
import bcrypt from  'bcrypt';
import jwt from 'jsonwebtoken';

import db from './../db.js';

dotenv.config();

export async function signUp (req,res){
  
  try {
    
    const newUser = req.body;

    const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

    await db.collection('users').insertOne({
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,        
      cpf: newUser.cpf,      
      address: newUser.address,
      addressNumber: newUser.addressNumber,
      complement: newUser.complement,
      neighborhood: newUser.neighborhood,
      zipCode: newUser.zipCode,
      city: newUser.city,    
      state: newUser.state,
      password: encryptedPassword
    });

    return res.sendStatus(201);

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function signIn(req,res){
  const {password} = req.body;
  const {userId, name, avatar} = res.locals;

  //const token = jwt.sign(password, process.env.JWT_KEY);

  try {
    //await db.collection('sessions').insertOne({userId, token})
    //return res.status(200).send({token, name, avatar})
    const token = res.locals.token;
    return res.status(200).send({token, name, avatar})
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}