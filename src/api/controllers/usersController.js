const jwt = require('jsonwebtoken');
const { mainModelsManager } = require('../models/modelsManager');
const { NON_EXISTING_USER, WRONG_EMAIL_PASSWORD } = require('../errors/usersErrors');
const { hashPassword, validateUserPassword } = require('../utils/hashUtils');

const { JWT_SECRET_OR_KEY } = process.env;

const findAllUsers = where => new Promise((resolve, reject) => mainModelsManager.getModel('User').findAll({ where })
  .then(results => resolve(results))
  .catch(err => reject(err))
);

const findUser = where => new Promise((resolve, reject) => mainModelsManager.getModel('User').findOne({ where })
  .then(result => result ? result : Promise.reject(NON_EXISTING_USER))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const createUser = user => new Promise((resolve, reject) => hashPassword(user.password)
  .then(passwordHash => mainModelManager.getModel('User').build({ ...user, passwordHash }))
  .then(newUser => newUser.save())
  .then(result => resolve(result.id))
  .catch(err => reject(err))
);

const updateUser = (where, user) => new Promise((resolve, reject) => mainModelsManager.getModel('User').findOne({ where })
  .then(result => result ? result : Promise.reject(NON_EXISTING_USER))
  .then(result => result.update(user))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const deleteUser = (where) => new Promise((resolve, reject) => mainModelsManager.getModel('User').destroy({ where })
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const login = (username, password) => new Promise((resolve, reject) => mainModelsManager.getModel('User').findOne({ where: { username } })
  .then(user => user ? validateUserPassword(user, password) : Promise.reject(WRONG_EMAIL_PASSWORD))
  .then(user => resolve(jwt.sign({ sub: user.id }, JWT_SECRET_OR_KEY)))
  .catch(err => reject(err))
);

const resetPassword = (where, password) => new Promise((resolve, reject) => findUser(where)
  .then(result => result ? result : Promise.reject(NON_EXISTING_USER))
  .then(() => hashPassword(password))
  .then(passwordHash => updateUser(where, { passwordHash }))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

module.exports = {
  findAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  resetPassword
}
