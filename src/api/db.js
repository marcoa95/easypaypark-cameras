const { Sequelize } = require('sequelize');
const { initModels } = require('./models/initModels');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

/**
 * Initialize the database
 * @returns {Promise<Sequelize>} Database instance
 */
const configDb = async () => {
  const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST,
  });

  initModels(db);

  try {
    await db.authenticate();

    console.log('Conexión establecida a la base de datos');

    return db;
  } catch (err) {
    console.error('Error al conectar a la base de datos');
    return Promise.reject(err);
  }
}

module.exports = {
  configDb
}
