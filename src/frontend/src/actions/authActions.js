import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMeUser, loginUser } from '../api/authApi';
import { clearToken, setData, setToken } from '../slices/authSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const login = createAsyncThunk('auth/login', ({ username, password, callback }, { dispatch }) => {
  dispatch(startLoading());

  loginUser(username, password)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => {
    window.localStorage.setItem('token', data.token);
    dispatch(setToken({ token: data.token }));
  })
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const logout = createAsyncThunk('auth/logout', ({ callback }, { dispatch }) => {
  dispatch(startLoading());

  dispatch(clearToken());

  window.localStorage.removeItem('token');

  dispatch(endLoading());

  callback();
});

export const getMe = createAsyncThunk('auth/getMe', (_, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getMeUser(token)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => {
    dispatch(setData({ data: data.user }));
  })
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
