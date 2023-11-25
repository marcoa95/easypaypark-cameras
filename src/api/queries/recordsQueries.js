const moment = require('moment');
const { Op } = require('sequelize');

const generateRecordsQuery = query => {
  const where = {};
  const limit = Number(query.results ?? 999999);
  const offset = Number((((query.page ?? 1) - 1)) * limit);

  query.plate ? where.plate = query.plate : null;
  query.model ? where.model = { [Op.like]: `%${query.model}%` } : null;
  query.camera ? where.cameraId = query.camera : null;
  query.date ? where.createdAt = { [Op.gte]: moment(query.date).startOf('day').toISOString(), [Op.lte]: moment(query.date).endOf('day').toISOString() } : null;

  return { where, offset, limit };
}

module.exports = {
  generateRecordsQuery
}
