const db = require('./../../sqlConnection.js');
const userAuth = require('./userAuthModule.js')

//bundle all userController middleware into a single userController object that can be exported as a module
const userController = {};

userController.signUp = (req, res, next) => {

  // console.log('userController.signUp:',req.body)

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
      // console.log('userController.signUp USER ADDED:',data);
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
    // console.log('passwordCheck after login:', passwordCheck);

    if (passwordCheck) return next();
    else return res.status(200).json({logIn: false})
  })

}

userController.addQuestion = async (req, res, next) => {
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
  await db.query(validateUserQuery, valueSSID)
  .then((data) => {
    // console.log(data.rows);
    // console.log(data.rows[0].date_asked);
    // console.log(Date.now());
    // console.log((data.rows[0].date_asked*1000 + (86400*1000)) < Date.now());
    if((!data.rows[0] || data.rows[0].date_asked + (86400 * 1000)) < Date.now()){
      console.log('flagging valid questions')
      shouldPost = true;
    }
  })
  const insertQString = `INSERT INTO nfquest (userhash, questions, votefor, voteagainst, date_asked, majority)
                          VALUES ($1, $2, 0, 0, $3, FALSE)`;
  //query to post question if previous query response is valid
  // shouldPost=true;
  console.log(shouldPost)
  if(shouldPost) {
    console.log('flagging shouldPost')
    db.query(insertQString, validateUserValues, (err, data) => {
      // console.log('*******IN SHOULD POST DB QUERY ********')
      // console.log(data)
      console.log(err)
    })
  }
  return next();
}


userController.getQuestions = (req, res, next) => {
  const getQuestionsQuery = 'SELECT * FROM nfquest WHERE date_asked > $1';
  const getQuestionsValues = [Date.now() - (86400 * 1000)];
  // console.log('getting questions after this millisecond' + getQuestionsValues)
  // 1619390127991
  db.query(getQuestionsQuery, getQuestionsValues)
    .then((data) => {
      res.locals = data.rows;
    })
    .then(() => next());

}


userController.getOneQuestion = (req, res, next) => {
  const getQuestionsQuery = 'SELECT * FROM nfquest WHERE date_asked > $1 AND questions = $2';
  const getQuestionsValues = [Date.now() - (86400 * 1000), req.body.question];
  // 1619390127991
  db.query(getQuestionsQuery, getQuestionsValues)
  .then((data) => {
    res.locals = data.rows[0];
    console.log(data.rows[0])
    console.log('received this question' + res.locals.votefor)
    })
    .then(() => next());

}

userController.getOneQuestion = (req, res, next) => {
  const getQuestionsQuery = 'SELECT * FROM nfquest WHERE date_asked > $1 ';
  const getQuestionsValues = [Date.now() - (86400 * 1000), req.body.question];
  console.log('getting questions after this millisecond' + getQuestionsValues)
  // 1619390127991
  db.query(getQuestionsQuery, getQuestionsValues)
    .then((data) => {
      res.locals = data.rows;
    })
    .then(() => next());

}


userController.getMemoQuestions = (req, res, next) => {
  const getQuestionsQuery = 'SELECT * FROM nfquest WHERE majority = True';
  db.query(getQuestionsQuery)
    .then((data) => {
      res.locals = data.rows;
      // console.log(res.locals)
      // console.log('data response from sql' + data.rows)
    })
    .then(() => next());

}


userController.insertHistory = async (req, res, next) => {
  let hasVoted;
  const checkHistory = [req.body.question, req.body.ssid]
  const checkHistoryQuery = 'SELECT * FROM questions_history WHERE question = $1 AND user_hash = $2'
  await db.query(checkHistoryQuery, checkHistory)
    .then((data) => {
      hasVoted = data.rows[0]
      console.log(hasVoted)
    })

  console.log('after question check, hasVoted = ' + hasVoted)
  const insertArray = [req.body.question, req.body.ssid]
  const insertQuestionQuery = 'insert into questions_history(user_hash, question) values ($2, $1)'
  if(hasVoted === undefined){
    console.log('letting user vote and updating the history table')
    db.query(insertQuestionQuery, insertArray, (err, data) => {
      console.log('inserted question that is valid and user can now upvote')
      return next();
    })
  }
}


userController.recordVote = async (req, res, next) => {

  const inputVote = req.body.vote;
  const question = req.body.question;
  let queriedData = {};


  const questCheck = [question];
  const checkQString = `SELECT * FROM nfquest WHERE questions = $1`;
  await db.query(checkQString, questCheck)
    .then((data) => {

      queriedData = data.rows[0];
    })
  

  // console.log(`***** Record Vote Quereied Data:`, queriedData);

  
  let updateVoteString = ``;
  let voteValues = [];
  let newVote;
  let majority = false;
  // console.log(queriedData)
  if (inputVote ===1) {
    updateVoteString = `UPDATE nfquest SET votefor = $1, majority = $3 WHERE questions = $2`;
    newVote = queriedData.votefor+1;
    majority = newVote > 3 ? true : false;
    voteValues = [newVote, question, majority];
  } else {
    updateVoteString = `UPDATE nfquest SET voteagainst = $1, majority = $3 WHERE questions = $2`;
    newVote = queriedData.voteagainst+1;
    majority = newVote > 3 ? true : false;
    voteValues = [newVote ,question, majority];
  }; 

  db.query(updateVoteString, voteValues, (err,data) => {
    // console.log('******** VOTE RECORDED IN MIDDLEWARE *********')
  })

  next();

}


//export the userController module
module.exports = userController;

/**`SELECT * FROM nfquest
    WHERE userhash = ($1) AND dateasked = (
      SELECT MAX(dateasked)
      FROM nfquest
  )` */