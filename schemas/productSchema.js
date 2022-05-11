import joi from 'joi';

export function validateProduct(req,res, next){
  const product = req.body;

  const options = {
    abortEarly:   false, 
    allowUnknown: true, 
    stripUnknown: true,
    convert     : false
  }

  const schema = joi.object({
    name:joi.string().trim().required(),
    description: joi.string().trim().required(), 
    image:joi.string().required(), 
    genre:joi.string().required(), 
    price:joi.number().invalid(0).required(),
    stock: joi.number().integer().invalid(0).required()
  });

  const {error, valuer} = schema.validate(product, options);

  if(error){
    return res.status(422).send(error.details.map(detail => detail.message));
  }

  next();
}