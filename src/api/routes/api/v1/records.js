const { Router } = require('express');
const {
  findAllRecords,
  findRecord,
} = require('../../../controllers/recordsController');
const {
  recordsGetIdValidator,
  recordsGetValidator,
} = require('../../../validators/recordsValidators');
const { generateRecordsQuery } = require('../../../queries/recordsQueries');
const errorHandler = require('../../../errors/errorHandler');

const router = Router();

router.get('/', recordsGetValidator, (req, res) => {
  const { query } = req;
  const where = generateRecordsQuery(query);

  findAllRecords(where)
  .then(records => res.status(200).send({ records }))
  .catch(err => errorHandler(res, err));
});

router.get('/:id', recordsGetIdValidator, (req, res) => {
  const { id } = req.params;

  findRecord({ id })
  .then(record => res.status(200).send({ record }))
  .catch(err => errorHandler(res, err));
});

module.exports = router;
