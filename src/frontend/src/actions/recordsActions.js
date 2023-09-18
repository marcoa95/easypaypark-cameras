import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecord, getRecords } from '../api/recordsApi';
import { setCurrentRecord, setRecordsList } from '../slices/recordsSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getRecordsList = createAsyncThunk('records/getRecordsList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getRecords(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setRecordsList({ records: data.records })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentRecord = createAsyncThunk('records/getCurrentRecord', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getRecord(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentRecord({ record: data.record })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
