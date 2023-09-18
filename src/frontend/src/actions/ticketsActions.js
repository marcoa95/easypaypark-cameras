import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateTicket } from '../api/ticketsApi';
import { showAlert } from '../slices/alertsSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const updateCurrentTicket = createAsyncThunk('users/updateCurrentTicket', ({ qrCode, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateTicket(token, qrCode)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => dispatch(showAlert({ message: 'Tarifa actualizada', type: 'success' })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
