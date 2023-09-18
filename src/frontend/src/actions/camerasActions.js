import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCamera, getCamera, getCameras, updateCamera } from '../api/camerasApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentCamera, setCamerasList } from '../slices/camerasSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getCamerasList = createAsyncThunk('cameras/getCamerasList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getCameras(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCamerasList({ cameras: data.cameras })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentCamera = createAsyncThunk('cameras/getCurrentCamera', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getCamera(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentCamera({ camera: data.camera })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewCamera = createAsyncThunk('cameras/createNewCamera', ({ camera, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createCamera(token, camera)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.camera))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentCamera = createAsyncThunk('cameras/updateCurrentCamera', ({ id, camera }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateCamera(token, id, camera)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentCamera({ camera: data.camera })))
  .then(() => dispatch(showAlert({ message: 'Cámara actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const deleteCurrentCamera = createAsyncThunk('cameras/deleteCurrentCamera', ({ id, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateCamera(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => dispatch(showAlert({ message: 'Cámara eliminado', type: 'success' })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
