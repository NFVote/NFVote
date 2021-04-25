const express = require('express');
const userAuthRouter = express.Router();
const path = require('path');
const cookieController = require('./../controllers/userAuthControl/cookieController.js');

//require in the userController
const userController = require('./../controllers/userAuthControl/userController.js');

//main route for the userAuth route handler.
const welcomeToUserAuth = 'Welcome To User Authentication\nFeel free to customize the main route as needed';
userAuthRouter.get('/', (req,res) => {
  return res.status(200).send(welcomeToUserAuth);
})

userAuthRouter.post(
  '/signUp',
  userController.signUp,
  cookieController.setSSIDCookie,
  (req,res) => {
    return res.status(200).send('SIGN UP SUCCESSFUL COOKIE SENT');
  }
)


userAuthRouter.post(
  '/logIn',
  userController.logIn,
  cookieController.setSSIDCookie,
  (req,res) => {
    console.log('userAuthRouter login callback fired')
    return res.status(200).json({logIn: true});
  }
)

// userAuthRouter

//add login route

//add more toures below



module.exports = userAuthRouter;