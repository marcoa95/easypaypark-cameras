const { Router } = require('express');
const {
  createRecord,
} = require('../controllers/recordsController');
const errorHandler = require('../errors/errorHandler');
const bodyParser = require('body-parser');

const router = Router();

router.post('/:name', bodyParser.xml(), (req, res) => {
  const { name } = req.params;
  const { EventNotificationAlert } = req.body;

  createRecord(EventNotificationAlert, name)
  .then(record => res.status(201).send({ record }))
  .catch(err => errorHandler(res, err));
});

module.exports = router;
