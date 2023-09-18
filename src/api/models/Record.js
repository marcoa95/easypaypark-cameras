const { DataTypes, Sequelize, ModelCtor } = require('sequelize');

/**
 * 
 * @param {Sequelize} db 
 * @returns {ModelCtor}
 */
const defineRecord = db =>{
  const Record = db.define('Record', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    cameraId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Cameras',
        key: 'id'
      }
    },
    plate: DataTypes.STRING,
    type: DataTypes.STRING,
    uuid: DataTypes.STRING,
    fileName: DataTypes.STRING,
    model: DataTypes.STRING,
  });

  return Record;
}

module.exports = {
  defineRecord
};
