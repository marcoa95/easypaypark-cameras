const { mainModelsManager } = require('../models/modelsManager');

const updateCount = value => new Promise((resolve, reject) => mainModelsManager.getModel('Count').findOne({ })
  .then(result => result.update({ count: value }))
  .then(result => resolve(result))
  .catch(err => reject(err))
);

module.exports = {
  updateCount,
}
