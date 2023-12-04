const moment = require('moment');
const { Op } = require('sequelize');

const generateRecordsQuery = query => {
  const where = {};
  const limit = Number(query.results ?? 999999);
  const offset = Number((((query.page ?? 1) - 1)) * limit);

  query.plate ? where.plate = query.plate : null;
  query.model ? where.model = { [Op.like]: `%${query.model}%` } : null;
  query.camera ? where.cameraId = query.camera : null;

  const start = new Date(query.start ?? null).toISOString().slice(0, 10);
  const end = query.end ? new Date(query.end).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  where.createdAt = {
    [Op.gte]: moment(start).startOf('day').toISOString(),
    [Op.lte]: moment(end).endOf('day').toISOString(),
  };

  return { where, offset, limit, start: query.start, end: query.end };
}

module.exports = {
  generateRecordsQuery
}
