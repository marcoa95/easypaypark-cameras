const { mainModelsManager } = require('../models/modelsManager');
const { mapXmlToRecord } = require('../utils/mapUtils');
const { NON_EXISTING_RECORD } = require('../errors/recordsErrors');
const { NON_EXISTING_CAMERA } = require('../errors/camerasErrors');

const findAllRecords = ({ where, offset, limit }) => new Promise((resolve, reject) => mainModelsManager.getModel('Record').findAll({
  where,
  offset,
  limit,
  order: [['createdAt', 'DESC']],
  include: [
    {
      association: 'camera'
    },
  ]})
  .then(results => resolve(results))
  .catch(err => reject(err))
);

const findRecord = where => new Promise((resolve, reject) => mainModelsManager.getModel('Record').findOne({
  where,
  include: [
    {
      association: 'camera'
    },
  ]})
  .then(result => result ? result : Promise.reject(NON_EXISTING_RECORD))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

const createRecord = (rawRecord, cameraName) => new Promise((resolve, reject) => mainModelsManager.getModel('Camera')
  .findOne({ where: { name: cameraName } })
  .then(camera => camera ? camera.id : Promise.reject(NON_EXISTING_CAMERA))
  .then(cameraId => mainModelsManager.getModel('Record').build(mapXmlToRecord(rawRecord, cameraId)))
  .then(newRecord => newRecord.save())
  .then(result => resolve(result.id))
  .catch(err => reject(err))
);

module.exports = {
  findAllRecords,
  findRecord,
  createRecord,
}
