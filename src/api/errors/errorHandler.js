const { INTERNAL_SERVER_ERROR, DATABASE_ERROR } = require('./serverErrors');
const { VALIDATION_ERROR, NOT_FOUND_ERROR } = require('./validationErrors');
const { UNAUTHORIZED } = require('./authErrors');
const { NON_EXISTING_USER, WRONG_EMAIL_PASSWORD } = require('./usersErrors');
const { NON_EXISTING_CAMERA } = require('./camerasErrors');
const { NON_EXISTING_RECORD } = require('./recordsErrors');


const errorHandler = (res, type, errors) => {
  let message, code;

  switch(type) {
    // Server errors
    case INTERNAL_SERVER_ERROR: message = 'Error en el servidor'; code = 500; break;
    case DATABASE_ERROR: message = 'Error en la base de datos'; code = 500; break;

    // Validation errors
    case VALIDATION_ERROR: message = 'Error de validación'; code = 400; break;
    case NOT_FOUND_ERROR: message = 'Recurso no encontrado'; code = 404; break;

    // Auth errors
    case UNAUTHORIZED: message = 'No autorizado'; code = 401; break;

    // Users errors
    case NON_EXISTING_USER: message = 'No existe el usuario'; code = 404; break;
    case WRONG_EMAIL_PASSWORD: message = 'Correo y/o contraseña inválidos'; code = 400; break;

    // Cameras errors
    case NON_EXISTING_CAMERA: message = 'No existe la cámara'; code = 404; break;

    // Records errors
    case NON_EXISTING_RECORD: message = 'No existe el registro'; code = 404; break;

    default: console.error(type); message = 'Error desconocido'; code = 500; break;
  }

  res.status(code).send({ error: Object.assign({ type, message }, errors ? { errors } : { }) });
}

module.exports = errorHandler;
