const { Router } = require('express');
const { XMLParser } = require("fast-xml-parser");
const {
  createRecord,
} = require('../controllers/recordsController');
const errorHandler = require('../errors/errorHandler');

const router = Router();

router.post('/:name', (req, res) => {
  const { name } = req.params;

  let rawData = Buffer.from('');

  req.on('data', chunk => rawData += chunk)
  .on('end', () => {
    const data = rawData.toString().slice(0,10000).match(/<EventNotificationAlert(.|\r\n|\r|\n)*EventNotificationAlert>/)?.[0];
    const xml = new XMLParser().parse(data);

    createRecord(xml.EventNotificationAlert, name)
    .then(record => res.status(201).send({ record }))
    .catch(err => errorHandler(res, err));
  })
  .on('error', err => errorHandler(res, err));
});

module.exports = router;
