const { checkSchema } = require('express-validator');
const { authenticateJwt } = require('../auth/passportConfig');
const { validatedBody, validateRequest } = require('./commonValidators');
const { CAMERAS_TYPES_ARRAY } = require('../constants/camerasConstants');

const camerasGetValidator = [
  authenticateJwt,
  validateRequest
];

const camerasGetIdValidator = [
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

const camerasPostValidator = [
  authenticateJwt,
  checkSchema({
    'camera.name': {
      isString: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      errorMessage: 'Introduzca un nombre de cámara válido'
    },
    'camera.type': {
      isString: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      isIn: { options: [CAMERAS_TYPES_ARRAY] },
      errorMessage: 'Introduzca un tipo válido'
    },
  }),
  validateRequest,
  validatedBody
];

const camerasPutIdValidator = [
  authenticateJwt,
  checkSchema({
    'id': {
      in: ['params'],
      isNumeric: true,
      errorMessage: 'Introduzca un id de cámara válido'
    },
    'camera.name': {
      optional: true,
      isString: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      errorMessage: 'Introduzca un nombre de cámara válido'
    },
    'camera.type': {
      optional: true,
      isString: true,
      escape: true,
      trim: true,
      isLength: { options: { min: 1 } },
      isIn: { options: [CAMERAS_TYPES_ARRAY] },
      errorMessage: 'Introduzca un tipo válido'
    },
  }),
  validateRequest,
  validatedBody
];

const camerasDeleteIdValidator = [
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
  camerasGetValidator,
  camerasGetIdValidator,
  camerasPostValidator,
  camerasPutIdValidator,
  camerasDeleteIdValidator,
}
