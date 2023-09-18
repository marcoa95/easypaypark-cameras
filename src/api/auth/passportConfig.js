const { Passport } = require('passport');
const { UNAUTHORIZED } = require('../errors/authErrors');
const errorHandler = require('../errors/errorHandler');
const jwtAuth = require('./jwtAuth');

const passport = new Passport();

passport.use(jwtAuth);

const authenticateJwt = (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
  if(!user) {
    return errorHandler(res, UNAUTHORIZED);
  } else if(err) {
    return errorHandler(res, UNAUTHORIZED);
  } else {
    req.user = user;
    next();
  }
})(req, res, next);

module.exports = {
  authenticateJwt
}
