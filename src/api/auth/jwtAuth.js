const { mainModelsManager } = require('../models/modelsManager');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { JWT_SECRET_OR_KEY } = process.env;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_OR_KEY
}

const jwtAuth = new JwtStrategy(options, (payload, done) => {
  mainModelsManager.getModel('User').findOne({ where: { id: payload.sub } })
  .then(user => {
    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
  .catch(err => done(err, false));
});

module.exports = jwtAuth;
