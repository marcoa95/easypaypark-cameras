const { Router } = require('express');
const {
  updateCount
} = require('../../../controllers/countController');
const {
  countPutValidator,
} = require('../../../validators/countValidators');
const errorHandler = require('../../../errors/errorHandler');

const router = Router();

router.put('/', countPutValidator , (req, res) => {
  const { value } = req.body.count;

  updateCount(value)
  .then(count => res.status(200).send({ count }))
  .catch(err => errorHandler(res, err));
});

module.exports = router;
