const db = require('./../../sqlConnection.js');
const userAuth = require('./userAuthModule.js')

//bundle all userController middleware into a single userController object that can be exported as a module
const userController = {};

userController.signUp = (req, res, next) => {

  console.log('userController.signUp:',req.body)

  const qValues = [
    req.body.email,
    req.body.password,
    req.body.lastName,
    req.body.firstName
  ]

  const qString =
    `INSERT INTO users_crypt (email, hash, lastname, firstname)
    VALUES ($1, crypt($2 ,gen_salt('bf')), $3, $4)`;

  db.query(qString, qValues)
    .then(data => {
      console.log('userController.signUp USER ADDED:',data);
      res.locals.newUser = data.rows[0];
    })
    .then(next)
    .catch(err => next({
      log: err,
      err: 'ERROR: userController.signUp FAILED TO CREATE USER'
    }))
}

userController.logIn = (req, res, next) => {

  // console.log('userController.logIn', req.body);


  const qValues = [
    req.body.email,
  ]
  // console.log(qValues)
  const qString = `SELECT email, hash FROM users_crypt WHERE email = $1`;

  db.query(qString, qValues, (err, data) => {
    if (err) {
      return next({
        log: err,
        err: 'ERROR: userController.logIn failed to query a user in the database'
      })
    }
    // console.log('THIS IS NOW A CALLBACK',data.rows[0]);
    const passwordCheck = userAuth.CHECK(req.body.password,data.rows[0].hash);

    if (passwordCheck) return next();
    else return res.status(200).json({logIn: false})
  })

  /* promise chain form of query
   db.query(qString, values)
     .then(data => {
       //compare the passwords then 2 different responses
       console.log('NEXT STEP: invoke next, move to cookie middleWare. data:',data.rows[0]);
       res.json(data.rows[0]);
     })
     .then(next)
     .catch(err => next({
       log: err,
       err: 'ERROR: userController.logIn failed to query a user in the database'
     }))
  */
}



//export the userController module
module.exports = userController;