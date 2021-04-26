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
  '/login',
  userController.logIn,
  cookieController.setSSIDCookie,
  (req,res) => {
    // console.log('userAuthRouter login callback fired')
    return res.status(200).json({logIn: true});
  }
)

// userAuthRouter

userAuthRouter.post(
  '/qPost',
  userController.addQuestion,
  (req,res) => {
    // console.log('******* userAuthRouter qPost callback fired *******')
    return res.status(200).json({qPost: true})
  }
)


//get all questions routes
userAuthRouter.get(
  '/getQuestions',
  userController.getQuestions,
  (req,res) => {
    // console.log('***Questions middleware executed and responded***')
    return res.status(200).json(res.locals)
  }
)


//get all questions routes
userAuthRouter.get(
  '/memoquestions',
  userController.getMemoQuestions,
  (req,res) => {
    // console.log('***Questions middleware executed and responded***')
    return res.status(200).json(res.locals)
  }
)


userAuthRouter.post(
  '/voteChange',
  userController.insertHistory,
  userController.recordVote,
  (req,res) => {
    // console.log('*** VOTE RECORDERD ***');
    return res.status(200).json({voteRecorded: true});
  }
)


//add more toures below



module.exports = userAuthRouter;