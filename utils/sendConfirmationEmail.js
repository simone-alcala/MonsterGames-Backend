import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


import db from '../db.js'
import { ObjectId } from 'mongodb';

dotenv.config();

export async function sendConfirmationEmail(purchaseId) {

  const purchaseInfo = await db.collection('purchases').findOne({_id: new ObjectId(purchaseId)});
  
  //server info
  const EMAIL     = process.env.EMAIL;
  const PASSWORD  = process.env.EMAIL_PWD;
  const HOST      = 'smtp.googlemail.com';
  const PORT      = 465;
  
  //email info
  const FROM    = `"MonsterGames ${process.env.EMAIL}"`;
  const TO      = purchaseInfo.userEmail;
  const SUBJECT = `Pedido ${purchaseId} confirmado`;
  const HTML    = createHtml(purchaseInfo);

  const transporter = nodemailer.createTransport({
    host:   HOST,
    port:   PORT,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  });
  
  const info = await transporter.sendMail({
    from:   FROM,
    to:     TO,
    subject:SUBJECT,
    html:   HTML
  });

  console.log('Email ok:', info.messageId);
  
}

function createHtml(purchaseInfo) {
  let html = '';

  html = `
  
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MonsterGames</title>
    </head>
    <body>
      <b>Olá, seu lindo nome</b>
      </br>
      <b>Seu pedido ${purchaseInfo._id} foi confirmado!</b>
      </br>
      <b>Data da compra: ${purchaseInfo.date}</b>
      </br>
      <b>Previsão de entrega: 7 dias úteis a partir da confirmação do pedido</b>

    </body>
  </html>
  
  `

  return html;  
}