import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

import db from './../db.js';

dotenv.config();

export async function createtSession (req,res,next) {

  const { userId   } = res.locals;

  try {
    
    const session = await db.collection('sessions').insertOne({
      userId, 
      date: dayjs().format('DD/MM/YYYY HH:mm:ss') });

    const infoToken = { 
      userId: userId, 
      sessionId: session.insertedId 
    } ;

    const token = jwt.sign(infoToken, process.env.JWT_KEY);

    res.locals.token = token;

    next();
  
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}