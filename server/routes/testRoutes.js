const express = require('express');
const testRouter = express.Router();
const path = require('path');


const testObj = [
  {name: 'David', age: 29 },
  {name: 'Lucy', age: 29}
];

testRouter.get('/', (req,res) => {
  return res.status(200).send(testObj);
})



module.exports = testRouter;