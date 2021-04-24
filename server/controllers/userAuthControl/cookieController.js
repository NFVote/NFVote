const cookieController = {};


cookieController.setSSIDCookie = (req,res,next) => {
  console.log('********* COOKIE CONTROLLER START *********')
  // console.log(req.body)
  res.cookie('ssid',req.body.email, {httpOnly: true, maxAge: 10000})
  // console.log(res.cookies)
  console.log('********* COOKIE CONTROLLER END *********')
  return next();
}






module.exports = cookieController;