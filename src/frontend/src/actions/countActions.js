import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateCount } from '../api/countApi';
import { showAlert } from '../slices/alertsSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const updateCurrentCount = createAsyncThunk('count/updateCurrentCount', ({ count }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateCount(token, count)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => dispatch(showAlert({ message: 'Número de vehículos actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
