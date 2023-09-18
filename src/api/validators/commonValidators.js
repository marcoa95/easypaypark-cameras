const { matchedData, validationResult } = require('express-validator');
const { UNAUTHORIZED } = require('../errors/authErrors');
const { VALIDATION_ERROR } = require('../errors/validationErrors');
const errorHandler = require('../errors/errorHandler');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(res, VALIDATION_ERROR, errors.array());
  } else {
    next();
  }
};

const validatedBody = (req, _, next) => {
  req.body = matchedData(req, { locations: ['body'] });
  next();
}

const validateSuper = (req, res, next) => {
  if(req.user.super) {
    next();
  } else {
    return errorHandler(res, UNAUTHORIZED);
  }
}

module.exports = {
  validateRequest,
  validatedBody,
  validateSuper,
}
