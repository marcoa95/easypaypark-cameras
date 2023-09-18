const { Op } = require('sequelize');

const generateUsersQuery = query => {
  const where = {};

  query.username ? where.username = { [Op.like]: `%${query.username}%` } : null;
  query.email ? where.email = query.email : null;

  return where;
}

module.exports = {
  generateUsersQuery
}
