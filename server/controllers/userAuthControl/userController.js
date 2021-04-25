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
    req.body.password,
  ]
  // console.log(qValues)
  const qString = `SELECT users, hash FROM users WHERE hash = $1`;

  db.query(qString, qValues, (err, data) => {
    if (err) {
      return next({
        log: err,
        err: 'ERROR: userController.logIn failed to query a user in the database'
      })
    }
    // console.log('THIS IS NOW A CALLBACK',data.rows[0]);
    // const passwordCheck = userAuth.CHECK(req.body.password,data.rows[0].hash);
    const passwordCheck = data.rows[0];
    console.log('passwordCheck after login:', passwordCheck);

    if (passwordCheck) return next();
    else return res.status(200).json({logIn: false})
  })

}

userController.addQuestion = (req, res, next) => {
  //get the user info from the body
  //query to check if user hash and date are valid
  const valueSSID = [req.body.ssid]
  let shouldPost = false;
  const validateUserValues = [req.body.ssid, req.body.question, Date.now()];
    //execute the query, and store returned data in local object
  const validateUserQuery = `SELECT * FROM nfquest WHERE userhash = $1 AND
  date_asked = (
      SELECT MAX(date_asked)
      FROM nfquest
  )`
  db.query(validateUserQuery, valueSSID, (err, data) => {
    console.log(data.rows[0].date_asked);
    console.log(Date.now());
    console.log((data.rows[0].date_asked*1000 + (86400*1000)) < Date.now());
    if((data.rows[0].date_asked + (86400 * 1000)) < Date.now()){
      console.log('flagging valid questions')
      shouldPost = true;
    }
  })
  const insertQString = `INSERT INTO nfquest (userhash, questions, votefor, voteagainst, date_asked, majority)
                          VALUES ($1, $2, 0,0,$3, FALSE)`;
  //query to post question if previous query response is valid
  shouldPost=true;
  if(shouldPost) {
    db.query(insertQString, validateUserValues, (err, data) => {
      console.log('*******IN SHOULD POST DB QUERY ********')
      console.log(data)
      console.log(err)
    })
  }
  return next();
}

//export the userController module
module.exports = userController;

/**`SELECT * FROM nfquest
    WHERE userhash = ($1) AND dateasked = (
      SELECT MAX(dateasked)
      FROM nfquest
  )` */