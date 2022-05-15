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
  const HOST      = process.env.EMAIL_HOST;
  const PORT      = process.env.EMAIL_PORT;
  
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

  html += `
  
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MonsterGames</title>
      </head>
      <body>
        <div>

          <table id="header" width="100%" cellspacing="0" cellpadding="3" >
            <tbody>
              <tr>
                <td >
                  <strong>Olá, ${purchaseInfo.userName}</strong>
                </td>
              </tr>
              <tr>
                <td >
                  <strong>Seu pedido "${purchaseInfo._id}" foi confirmado!</strong>
                </td>
              </tr>
              <tr>
                <td >
                  Data da compra: ${purchaseInfo.date}
                </td>
              </tr>
              <tr>
                <td >
                  <strong>Previsão de entrega: 7 dias úteis a partir da confirmação do pedido</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <br/> <strong>Itens do pedido:</strong> <br/> 

          <table id="items" width="100%" cellspacing="0" cellpadding="10" >
            <tbody>
    `;

    purchaseInfo.products.forEach(game => {

      html += `

        <tr>
          <td width="110">  
            <img src=${game.image} alt=${game.name} width="90px" height="100px"/>
          </td>
          <td>
            <span>${game.name}</span>  <br/>   
            <span>Qtd.: ${game.quantity}</span>   <br/> 
            <strong>R$ ${game.price.toFixed(2).replace('.',',')}</strong> cada
          </td>
        </tr>
      `
    });


    html += `
            </tbody>
          </table>

          <br/> 

          <table id="footer" width="100%" cellspacing="0" cellpadding="10" >
            <tbody>

              <tr>
                <td width="100%">  
                <strong>Total do pedido: R$ ${purchaseInfo.totalPrice.toFixed(2).replace('.',',')}</strong>
                </td>
              </tr>  

            </tbody>
          </table>

          <br/>  

          <strong>Agradecemos a preferência :)</strong>
          <br/> 
          <strong>Equipe Monster Games</strong>
          
        </div>

      </body>
    </html>
    `
  return html;  
}