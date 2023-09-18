import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsSlice from '../slices/alertsSlice';
import authSlice from '../slices/authSlice';
import loadingSlice from '../slices/loadingSlice';
import errorsSlice from '../slices/errorsSlice';
import usersSlice from '../slices/usersSlice';
import camerasSlice from '../slices/camerasSlice';
import recordsSlice from '../slices/recordsSlice';
import countSlice from '../slices/countSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  alerts: alertsSlice,
  loading: loadingSlice,
  errors: errorsSlice,
  users: usersSlice,
  cameras: camerasSlice,
  records: recordsSlice,
  count: countSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
