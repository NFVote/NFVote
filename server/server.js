const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

//require in the serverRouteStrings from the client
// const serverRouteStrings = {
//   SRV_Main: '/server',
//   SRV_Test: '/server/test',

//   SRV_UserAuth: '/server',
//   // SRV_UserAuth_SignUp: '/server/userAuth/signUp',
//   // SRV_UserAuth_LogIn: '/server/login',
//   // SRV_UserAuth_LogInFailed: SRV_UserAuth_LogInFailed,
//   // SRV_UserAuth_LogInSuccess: SRV_UserAuth_LogInSuccess,

// };
// console.log(serverRouteStrings);

//require in all necessary routers
const testRouter = require('./routes/testRoutes.js');
const userAuthRouter = require('./routes/userAuthRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//connect external / auxiliary routers to the serverApp
// app.use(serverRouteStrings.SRV_Test, testRouter);
app.use('/server', userAuthRouter);


app.use((req, res, next) => {
  console.log(`
  ***** FLOW TEST *****\n
  METHOD: ${req.method}\n
  URL: ${req.url}\n`);
  return next();
});


const testObj = [
  {name: 'David', age: 29 },
  {name: 'Lucy', age: 29}
];

app.get('/test', (req,res) => {
  return res.status(200).send(testObj);
})

// app.post('/login', 
//   // userController.verifyUser,  
//   // cookieController.setSSIDCookie,
//   // sessionController.startSession,
//   (req, res) => {
//     console.log('server side here');
//     res.redirect('../Client/secret.html');
// });

// app.post('/login', (req, res) => {
//   console.log('server side here');
//   res.status(200).redirect();
//   // res.status(200).redirect('./..')
// });
// // userController.verifyUser,  
// // cookieController.setSSIDCookie,
// // sessionController.startSession,



if (process.env.NODE_ENV === 'production'){
  //statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname,'../build')));
  //serve index.html on the route '/'
  app.get('/', (req,res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('********** GLOBAL INTERNAL SERVER / 500 ERROR **********');
});



app.listen(4000);

module.exports = app;
