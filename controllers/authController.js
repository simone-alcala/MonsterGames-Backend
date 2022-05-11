import bcrypt from  'bcrypt';

import db from './../db.js';

export async function signUp (req,res){
  
  try {
    
    const newUser = req.body;

    const encryptedPassword = bcrypt.hashSync(newUser.password, 10);

    await db.collection('users').insertOne({
      name: newUser.name,
      email: newUser.email,        
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