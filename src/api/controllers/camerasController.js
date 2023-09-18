const { mainModelsManager } = require('../models/modelsManager');
const { NON_EXISTING_CAMERA } = require('../errors/camerasErrors');

const findAllCameras = where => new Promise((resolve, reject) => mainModelsManager.getModel('Camera').findAll({ where })
  .then(results => resolve(results))
  .catch(err => reject(err))
);

const findCamera = where => new Promise((resolve, reject) => mainModelsManager.getModel('Camera').findOne({ where })
  .then(result => result ? result : Promise.reject(NON_EXISTING_CAMERA))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const createCamera = camera => new Promise((resolve, reject) => {
  const newCamera = mainModelsManager.getModel('Camera').build(camera);
  
  newCamera.save()
  .then(result => resolve(result.id))
  .catch(err => reject(err))
});

const updateCamera = (where, camera) => new Promise((resolve, reject) => mainModelsManager.getModel('Camera').findOne({ where })
  .then(result => result ? result : Promise.reject(NON_EXISTING_CAMERA))
  .then(result => result.update(camera))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const deleteCamera = (where) => new Promise((resolve, reject) => mainModelsManager.getModel('Camera').destroy({ where })
  .then(result => resolve(result))
  .catch(err => reject(err))
);

module.exports = {
  findAllCameras,
  findCamera,
  createCamera,
  updateCamera,
  deleteCamera,
}
