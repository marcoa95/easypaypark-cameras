const { Router } = require('express');

const router = Router();

const users = require('./v1/users');
const cameras = require('./v1/cameras');
const records = require('./v1/records');
const count = require('./v1/count');

router.use('/users', users);
router.use('/cameras', cameras);
router.use('/records', records);
router.use('/count', count);

module.exports = router;
