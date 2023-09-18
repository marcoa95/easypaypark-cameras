const { checkSchema } = require('express-validator');
const { authenticateJwt } = require('../auth/passportConfig');
const { validateRequest } = require('./commonValidators');

const recordsGetValidator = [
  authenticateJwt,
  validateRequest
];

const recordsGetIdValidator = [
  authenticateJwt,
  checkSchema({
    'id': {
      in: ['params'],
      isNumeric: true,
      errorMessage: 'Introduzca un id de cámara válido'
    },
  }),
  validateRequest
];

module.exports = {
  recordsGetValidator,
  recordsGetIdValidator,
}
