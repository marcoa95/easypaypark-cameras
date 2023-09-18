const { Router } = require('express');
const {
  createCamera,
  deleteCamera,
  findAllCameras,
  findCamera,
  updateCamera
} = require('../../../controllers/camerasController');
const {
  camerasGetIdValidator,
  camerasGetValidator,
  camerasPostValidator,
  camerasPutIdValidator,
  camerasDeleteIdValidator,
} = require('../../../validators/camerasValidators');
const { generateCamerasQuery } = require('../../../queries/camerasQueries');
const errorHandler = require('../../../errors/errorHandler');

const router = Router();

router.get('/', camerasGetValidator, (req, res) => {
  const { query } = req;
  const where = generateCamerasQuery(query);

  findAllCameras(where)
  .then(cameras => res.status(200).send({ cameras }))
  .catch(err => errorHandler(res, err));
});

router.get('/:id', camerasGetIdValidator, (req, res) => {
  const { id } = req.params;

  findCamera({ id })
  .then(camera => res.status(200).send({ camera }))
  .catch(err => errorHandler(res, err));
});

router.post('/', camerasPostValidator, (req, res) => {
  const { camera } = req.body;

  createCamera(camera)
  .then(camera => res.status(201).send({ camera }))
  .catch(err => errorHandler(res, err));
});

router.put('/:id', camerasPutIdValidator , (req, res) => {
  const { id } = req.params;
  const { camera } = req.body;

  updateCamera({ id }, camera)
  .then(camera => res.status(200).send({ camera }))
  .catch(err => errorHandler(res, err));
});

router.delete('/:id', camerasDeleteIdValidator, (req, res) => {
  const { id } = req.params;

  deleteCamera({ id })
  .then(() => res.status(200).send())
  .catch(err => errorHandler(res, err));
});

module.exports = router;
