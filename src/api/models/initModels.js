const { Sequelize } = require('sequelize');
const { defineCamera } = require('./Camera');
const { defineRecord } = require('./Record');
const { defineUser } = require('./User');
const { defineCount } = require('./Count');
const { CAMERAS_TYPES } = require('../constants/camerasConstants');

/**
 * Initialize the database
 * @param {Sequelize} db 
 */
const initModels = async (db) => {
  defineUser(db);
  const Camera = defineCamera(db);
  const Record = defineRecord(db);
  const Count = defineCount(db);

  await Camera.sync();
  await Record.sync();

  Record.afterCreate(async record => {
    const camera = await Camera.findOne({ where: { id: record.cameraId } });

    const count = await Count.findOne();

    if(camera.type === CAMERAS_TYPES.IN) {
      count.update({ count: count.count + 1 });
    } else {
      if(count.count > 0) count.update({ count: count.count - 1 });
    }

    count.save();
  });

  Record.belongsTo(Camera, { as: 'camera', foreignKey: 'cameraId' })
  Camera.hasMany(Record, { as: 'records', foreignKey: 'cameraId' });
}

module.exports = {
  initModels,
}
