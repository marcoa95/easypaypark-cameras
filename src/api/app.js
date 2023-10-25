const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const bodyLogger = require('morgan-body');
const path = require('path');

const app = express();

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false
}));app.use(cors());
app.use(logger('tiny'));
bodyLogger(app);

const camaras = require('./routes/camaras');
app.use('/camaras', camaras)

app.use(bodyParser.json());

const api = require('./routes/api');

app.use('/api', api);
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.get('*', (_, res) => res.redirect('/'));

module.exports = app;
