const { checkSchema } = require('express-validator');
const { authenticateJwt } = require('../auth/passportConfig');
const { validatedBody, validateRequest } = require('./commonValidators');

const countPutValidator = [
  authenticateJwt,
  checkSchema({
    'count.value': {
      isInt: true,
      errorMessage: 'Introduzca un valor válido'
    },
  }),
  validateRequest,
  validatedBody
];

module.exports = {
  countPutValidator,
}
