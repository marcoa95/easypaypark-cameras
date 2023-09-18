const { DataTypes, Sequelize, ModelCtor } = require('sequelize');

/**
 * 
 * @param {Sequelize} db 
 * @returns {ModelCtor}
 */
const defineCamera = db =>{
  const Camera = db.define('Camera', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
  });

  return Camera;
}

module.exports = {
  defineCamera
};
