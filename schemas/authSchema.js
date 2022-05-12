import joi from 'joi';

const options = {
  abortEarly:   false, 
  allowUnknown: true, 
  stripUnknown: true,
  convert     : false
}

export function schemaSignUp (req,res,next) {

  const newUser = req.body;   

  let checkAvatar = true;
  if (newUser.avatar && newUser.avatar !== '') {
    const regex = new RegExp(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/);
    checkAvatar = regex.test(newUser.avatar);
  }

  const schema    = joi.object({
    name:           joi.string().trim().required(),
    email:          joi.string().trim().email().required(),
    password:       joi.string().required(),
    repeat_password: joi.ref('password')
  }) .with('password', 'repeat_password');;

  const validate = schema.validate(newUser,options);

  let errorMessages = [];
  
  if (validate.error) {
    errorMessages = validate.error.details.map(detail => detail.message);
  }  
  
  if (!checkAvatar) errorMessages.push('Invalid url avatar');

  if (errorMessages.length > 0){
    return res.status(422).send(errorMessages);
  }
  
  next();
}

export function schemaSignIn(req,res,next){
  const {email, password} = req.body;

  const schema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().required()
  })

  const { error, value } = schema.validate({email, password}, options);

  if(error){
    return res.status(422).send(error.details.map(detail => detail.message));
  }

  next();
}