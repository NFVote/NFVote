const bcrypt = require('bcrypt');

const userAuth = {
  SALT: bcrypt.genSaltSync(10),
  HASH: (password,salt) => bcrypt.hashSync(password,salt),
  CHECK: (password, hash) => bcrypt.compareSync(password, hash),
}

module.exports = userAuth;

/** BCRYPT TEST & SAMPLE CODE

  let pw = 'password';
  let sa = bcrypt.genSaltSync(10)
  let H = userAuth.HASH(pw,sa);
  let check = userAuth.CHECK(pw,H);

  console.time('bcrypt')
  console.timeLog('bcrypt')
  console.log(userAuth.SALT);
  console.timeLog('bcrypt')
  console.log(H);
  console.timeEnd('bcrypt')

  const output = userAuth.CHECK('password',H);
  const falseCheck = userAuth.CHECK('passworD',H);
  console.log(output)
  console.log(falseCheck)

 */