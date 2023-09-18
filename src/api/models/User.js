const { DataTypes, Sequelize, ModelCtor } = require('sequelize');
const { hashPassword } = require('../utils/hashUtils');

const { DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD, DEFAULT_ADMIN_EMAIL } = process.env;

/**
 * 
 * @param {Sequelize} db 
 * @returns {ModelCtor}
 */
const defineUser = db =>{
  const User = db.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    super: DataTypes.BOOLEAN,
  });

  User.sync()
  .then(() => User.findOne({ where: { id: 1 } }))
  .then(result => {
    if(result) {
      return;
    }

    hashPassword(DEFAULT_ADMIN_PASSWORD)
    .then(passwordHash => User.build({
      username: DEFAULT_ADMIN_USERNAME,
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash,
      super: true
    }))
    .then(newUser => newUser.save())
    .catch(err => console.error(err));
  });

  return User;
}

module.exports = {
  defineUser
};
