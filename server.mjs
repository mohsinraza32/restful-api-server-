// const express = require('express')   // doesnt work in module js

import express from 'express'
import cors from "cors";

const app = express()
app.use(express.json());
app.use(cors())
const port = process.env.PORT || 3000;   // for checking which port is available on heroku. (short form)

// let port = null;     // for checking which port is available on heroku. (Long form)

// if(process.env.PORT){
//   port = process.env.PORT;
// }else{
//   port = 3000;
// }


let users = [];     // replace this through mongoDb

// Generate  random number from 1 to 100000000000

function randomNumber(){

  return Math.floor(Math.random() * 100000000000);
}

app.post("/user", (req, res) => {

  console.log(req.body);

  let newUser = {
    id: randomNumber(),
    fullName: req.body.fullName,
    userName: req.body.userName,
    Password: req.body.password
  }

  users.push(newUser);

  res.status(201).send("user is created");

})

app.get("/user/:userId", (req, res) => {   // get single user

  let userId = req.params.userId;
  let isFound = false;                 // flag (abhi mila ni h)

  for( i = 0 ; i < users.length ; i++ ){

    if(users[i].id == userId){
      res.send(users[i]);
      isFound = true;
      break;

    }
  }
  if(!isFound){
    res.status(204).send("user not found");
  }
  
})

app.get("/users", (req, res) => {       // get all users
  res.send(users);

})

app.put("/user/:userId", (req, res) => {   // to modify single user

  let userId = req.params.userId;
  let userIndex = -1;

  for( i = 0 ; i < users.length ; i++){

    if(users[i].id == userId){
      res.send(users[i]);
      userIndex = i;
      break;

    }
  }
  if(userIndex == -1){
    res.status(204).send("user not found");
  }else{
    if(req.body.fullName){
      users[userIndex].fullName = req.body.fullName;
    }
    if(req.body.userName){
      users[userIndex].userName = req.body.userName;
    }
    if(req.body.password){
      users[userIndex].password = req.body.password;
    }
    res.send( users[userIndex]);
  }

})

app.delete("/user/:userId", (req, res) => {    // delete single user

  let userId = req.params.userId;
  let userIndex = -1;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      userIndex = i;
      break;
    }
  }
  if (userIndex === -1) {

    res.status(204).send("user not found");

  } else {
    users.splice(userIndex, 1);
    res.send("user is deleted")
  }
})

app.delete("/user", (req, res) => {    // delete all user

  users = [];

  res.send("all users are deleted");

})

app.get('/', (req, res) => {
  console.log("ek request server per i")
  res.send('Hello World!')
})

app.get('/profile', (req, res) => {
  console.log("ek request server per i")
  res.send('This is a profile!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


