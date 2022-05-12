export async function getUser(req,res){
  const {registeredUser} = res.locals;

  res.status(200).send(registeredUser);
}