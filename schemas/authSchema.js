import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true,
  convert     : false
}

export function validateUser (req,res,next) {

  const newUser = req.body;   

  const schema    = joi.object({
    name:           joi.string().trim().required(),
    email:          joi.string().trim().email().required(),
    cpf:            joi.string().length(14).trim().required(),
    address:        joi.string().trim().required(),
    addressNumber:  joi.string().trim().required(),
    complement:     joi.string().trim(),
    neighborhood:   joi.string().trim().required(),
    zipCode:        joi.string().length(9).trim().required(),
    city:           joi.string().trim().required(),
    state:          joi.string().length(2).trim().required(),//TODO: add
    password:       joi.string().required(),
    repeat_password: joi.ref('password')
  }) .with('password', 'repeat_password');;

  const validate = schema.validate(newUser,options);
  
  if (validate.error) 
    return res.status(422).send(validate.error.details.map(detail => detail.message));

  next();

}