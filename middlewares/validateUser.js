import { ObjectId } from 'mongodb';

import db from './../db.js';

export async function validateUser (req,res,next) {

  try {

    const { token } = req.params;
    if (!token) return res.status(401).send('Token inválido');
  
    const session = await db.collection('sessions').findOne({ token });  
    if (!session) return res.status(404).send('Sessão inválida');  
    
    const registeredUser = await db.collection('users').findOne({_id: new ObjectId (session.userId)});
    if (!registeredUser) return res.status(404).send('Usuário não encontrado');

    delete registeredUser.password;
    res.locals.registeredUser = registeredUser;
    next();
    
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } 
}