const { Router } = require('express');
const {
  createUser,
  deleteUser,
  findAllUsers,
  findUser,
  login,
  resetPassword,
  updateUser
} = require('../../../controllers/usersController');
const {
  usersDeleteIdValidator,
  usersGetIdValidator,
  usersGetMeValidator,
  usersGetValidator,
  usersPostLoginValidator,
  usersPostValidator,
  usersPutIdValidator,
  usersPutResetPassword
} = require('../../../validators/usersValidators');
const { generateUsersQuery } = require('../../../queries/usersQueries');
const errorHandler = require('../../../errors/errorHandler');

const router = Router();

router.get('/', usersGetValidator, (req, res) => {
  const { query } = req;
  const where = generateUsersQuery(query);

  findAllUsers(where)
  .then(users => res.status(200).send({ users }))
  .catch(err => errorHandler(res, err));
});

router.get('/me', usersGetMeValidator, (req, res) => {
  const { id } = req.user;

  findUser({ id })
  .then(user => res.status(200).send({ user }))
  .catch(err => errorHandler(res, err));
});

router.get('/:id', usersGetIdValidator, (req, res) => {
  const { id } = req.params;

  findUser({ id })
  .then(user => res.status(200).send({ user }))
  .catch(err => errorHandler(res, err));
});

router.post('/', usersPostValidator, (req, res) => {
  const { user } = req.body;

  createUser(user)
  .then(user => res.status(201).send({ user }))
  .catch(err => errorHandler(res, err));
});

router.put('/:id', usersPutIdValidator , (req, res) => {
  const { id } = req.params;
  const { user } = req.body;

  updateUser({ id }, user)
  .then(user => res.status(200).send({ user }))
  .catch(err => errorHandler(res, err));
});

router.delete('/:id', usersDeleteIdValidator, (req, res) => {
  const { id } = req.params;

  deleteUser({ id })
  .then(() => res.status(200).send())
  .catch(err => errorHandler(res, err));
});

router.post('/login', usersPostLoginValidator, (req, res) => {
  const { data } = req.body;

  login(data.username, data.password)
  .then(token => res.status(200).send({ token }))
  .catch(err => errorHandler(res, err));
});

router.put('/:id/reset-password', usersPutResetPassword , (req, res) => {
  const { id } = req.params;
  const { password } = req.body.data;

  resetPassword({ id }, password)
  .then(user => res.status(200).send({ user }))
  .catch(err => errorHandler(res, err));
});

module.exports = router;
