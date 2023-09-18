const { Op } = require('sequelize');

const generateCamerasQuery = query => {
  const where = {};

  query.name ? where.name = { [Op.like]: `%${query.name}%` } : null;
  query.type ? where.type = query.type : null;

  return where;
}

module.exports = {
  generateCamerasQuery
}
