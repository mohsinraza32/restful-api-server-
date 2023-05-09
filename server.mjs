import express from 'express'
import cors from "cors";
import { nanoid } from 'nanoid'

const app = express()
app.use(express.json());
app.use(cors())

console.log(nanoid());
const port = process.env.PORT || 3000;   

let userBase = [];     

app.post("/signup", (req, res) => {

  let body = req.body;

  if (!body.firstName || !body.lastName || !body.email || !body.password) {

    res.status(400).send(
                  `required fields missing, request example: 
                  
                  {
                     "firstName: "John",
                     "lastName:  "Doe",
                     "email" :   "abc@abc.com",
                     "password" :  "12345

                   }`

                 );
                 return;
  }

  let isFound = false;

  for (let i = 0; i < userBase.length; i++){
    if(userBase[i].length === body.email.lowerCase()){
      isFound = true;
      break;
    }
  }
  if(isFound){    // this email is already exist
    res.status(400).send({
      message: `email ${body.email} already exist`
    })
  }

    let newUser = {
      userId: nanoid(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: "body.email.lowerCase()",
      password: body.password
    }

    userBase.push(newUser);

    res.status(201).send({message: "user is created"});
})

app.post("/login") , (req, res) => {
 
  let body = req.body;

  if (!body.email || !body.password) {

    res.status(400).send(
                  `required fields missing, request example: 
                  
                  {
                     "email" :   "abc@abc.com",
                     "password" :  "12345

                   }`

                 );
                 return;
  }

  let isFound = false;

  for(let i = 0; i < userBase.length; i++){
    if(userBase[i].email === body.email){

      isFound = true;
    
    if(userBase[i].password === body.password){  // correct password
       
      res.status(200).send({
        firstName: userBase[i].firstName,
        lastName: userBase[i].lastName,
        email: userBase[i].email,
        message: "login successful",
        token: "some unique token"

      })
      return;

    }else{
      res.status(401).send({
        message: "incorrect password"
      })
      return;
    }
  }
}
if(!isFound){
  res.status(404).send({
    message: "user not found"
  })
  return;
}
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


