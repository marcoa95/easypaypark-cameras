const { checkSchema } = require('express-validator');
const { authenticateJwt } = require('../auth/passportConfig');
const { validatedBody, validateRequest, validateSuper } = require('./commonValidators');

const usersGetValidator = [
  authenticateJwt,
  validateSuper,
  validateRequest
];

const usersGetMeValidator = [
  authenticateJwt,
  validateRequest
];

const usersGetIdValidator = [
  authenticateJwt,
  validateSuper,
  checkSchema({
    'id': {
      in: ['params'],
      isNumeric: true,
      errorMessage: 'Introduzca un id de usuario válido'
    },
  }),
  validateRequest
];

const usersPostValidator = [
  authenticateJwt,
  validateSuper,
  checkSchema({
    'user.username': {
      isString: true,
      optional: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      errorMessage: 'Introduzca un nombre de usuario válido'
    },
    'user.email': {
      isEmail: true,
      optional: true,
      errorMessage: 'Introduzca un correo válido'
    },
    'user.password': {
      isString: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      errorMessage: 'Introduzca una contraseña válida'
    },
    'user.super': {
      isBoolean: true,
      errorMessage: 'Introduzca un nivel de súperusuario válido'
    }
  }),
  validateRequest,
  validatedBody
];

const usersPostLoginValidator = [
  checkSchema({
    'data.username': {
      isString: true,
      errorMessage: 'Introduzca un nombre de usuario válido'
    },
    'data.password': {
      isString: true,
      errorMessage: 'Introduzca una contraseña válida'
    }
  }),
  validateRequest,
  validatedBody
];

const usersPutIdValidator = [
  authenticateJwt,
  validateSuper,
  checkSchema({
    'id': {
      in: ['params'],
      isNumeric: true,
      errorMessage: 'Introduzca un id de usuario válido'
    },
    'user.username': {
      isString: true,
      optional: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      errorMessage: 'Introduzca un nombre de usuario válido'
    },
    'user.email': {
      isEmail: true,
      optional: true,
      errorMessage: 'Introduzca un correo válido'
    },
    'user.super': {
      isBoolean: true,
      optional: true,
      errorMessage: 'Introduzca un nivel de súperusuario válido'
    }
  }),
  validateRequest,
  validatedBody
];

const usersPutResetPassword = [
  authenticateJwt,
  validateSuper,
  checkSchema({
    'id': {
      in: ['params'],
      isNumeric: true,
      errorMessage: 'Introduzca un id de usuario válido'
    },
    'data.password': {
      isString: true,
      errorMessage: 'Introduzca una contraseña válida'
    },
  }),
  validateRequest
];

const usersDeleteIdValidator = [
  authenticateJwt,
  validateSuper,
  checkSchema({
    'id': {
      in: ['params'],
      isNumeric: true,
      errorMessage: 'Introduzca un id de usuario válido'
    },
  }),
  validateRequest
];

module.exports = {
  usersGetValidator,
  usersGetMeValidator,
  usersGetIdValidator,
  usersPostValidator,
  usersPostLoginValidator,
  usersPutIdValidator,
  usersPutResetPassword,
  usersDeleteIdValidator,
}
