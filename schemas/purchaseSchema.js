import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true,
  convert     : false
}

export function schemaPaymentInfo (req,res,next){
  const {paymentInfo} = req.body;

  const schema = joi.object({
    cardNumber:  joi.string().trim().creditCard().required(),
    expireDate:  joi.string().pattern(/^(1[0-2]|0[1-9]|\d)\/(2[3-9]|[3-9][0-9])$/).required(),
    cvv:         joi.number().integer().positive().max(999).required(),
    cpf:         joi.string().length(14).trim().required(),
    installments:joi.number().integer().positive().max(3).required(),
    value:       joi.number().precision(2).required()
  });

  const {error} = schema.validate(paymentInfo, options);

  if(error){
    return res.status(422).send(error.details.map(detail => detail.message));
  }
  
  next();
}

export function schemaProductInfo (req,res,next){

  const {products} = req.body;

  const schema = joi.object({
    _id:  joi.string().trim().length(24).required(),
    name: joi.string().trim().required(),
    image:joi.string().pattern(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/),
    price:joi.number().positive().precision(2).required(),
    quantity:joi.number().integer().positive().required()
  });

  const errorMessages = [];
  products.forEach(product => {
    const {error} = schema.validate(product, options);

    if(error){
      errorMessages.push(error.details.map(detail => detail.message))
    }
  })
    
  if (errorMessages.length > 0) return res.status(422).send(errorMessages); 

  next();
}

export function schemaSendToInfo (req,res,next){

  const {sendTo} = req.body;   

  const schema    = joi.object({
    address:        joi.string().trim().required(),
    addressNumber:  joi.string().trim().required(),
    complement:     joi.string().trim(),
    neighborhood:   joi.string().trim().required(),
    zipCode:        joi.string().length(9).trim().required(),
    city:           joi.string().trim().required(),
    state:          joi.string().length(2).trim().required()
  });

  const validate = schema.validate(sendTo,options);
  
  if (validate.error) 
    return res.status(422).send(validate.error.details.map(detail => detail.message));

  next();
}