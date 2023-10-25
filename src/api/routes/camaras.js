const { Router } = require('express');
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
    const data = rawData.toString();

    console.log('DATA', data);

    res.status(200).send('DATA: ' + data);

    // createRecord(data, name)
    // .then(record => res.status(201).send({ record }))
    // .catch(err => errorHandler(res, err));
  })
  .on('error', err => errorHandler(res, err));
});

module.exports = router;
