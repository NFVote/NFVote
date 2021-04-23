const express = require('express');
const serverApp = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const testRouter = express.Router();


serverApp.use(express.json());
serverApp.use(express.urlencoded({ extended: true }));
serverApp.use(cookieParser());


serverApp.use((req, res, next) => {
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

testRouter.get('/test', (req,res) => {
  return res.status(200).send(testObj);
})




if (process.env.NODE_ENV === 'production'){
  //statically serve everything in the build folder on the route '/build'
  serverApp.use('/build', express.static(path.join(__dirname,'../build')));
  //serve index.html on the route '/'
  serverApp.get('/', (req,res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

/**
 * 404 handler
 */
serverApp.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

/**
 * Global error handler
 */
serverApp.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('********** GLOBAL INTERNAL SERVER / 500 ERROR **********');
});



serverApp.listen(4000);

module.exports = serverApp;
