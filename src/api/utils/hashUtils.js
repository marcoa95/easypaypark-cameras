const bcrypt = require('bcrypt');
const { WRONG_EMAIL_PASSWORD } = require('../errors/usersErrors');
const { INTERNAL_SERVER_ERROR } = require('../errors/serverErrors');

const { HASH_SALT } = process.env;

const hash = password => bcrypt.hash(password + HASH_SALT, 10);

const compare = (password, paswordHash) => bcrypt.compare(password + HASH_SALT, paswordHash);

const hashPassword = password => new Promise((resolve, reject) => {
  if(password.length > 0) {
    hash(password)
    .then(passwordHash => resolve(passwordHash))
    .catch(err => reject(INTERNAL_SERVER_ERROR));
  } else {
    resolve('');
  }

});

const validateUserPassword = (user, password) => new Promise((resolve, reject) => compare(password, user.passwordHash)
  .then(result => result ? resolve(user) : Promise.reject(WRONG_EMAIL_PASSWORD))
  .catch(err => reject(err))
);

module.exports = {
  hashPassword,
  validateUserPassword
}
