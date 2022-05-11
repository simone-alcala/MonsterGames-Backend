import db from './../db.js';

export async function validateSignUp (req,res,next) {

  try {

    const newUser = req.body;   
    const alreadyRegistered = await db.collection('users').findOne({ email: newUser.email });
    if (alreadyRegistered) return res.send(`Email "${newUser.email}" already registered`);
    
    next();   
    
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } 
}