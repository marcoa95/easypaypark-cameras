import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, getUser, getUsers, updateUser, resetUserPassword } from '../api/usersApi';
import { showAlert } from '../slices/alertsSlice';
import { setCurrentUser, setUsersList } from '../slices/usersSlice';
import { handleError } from '../slices/errorsSlice';
import { startLoading, endLoading } from '../slices/loadingSlice';

export const getUsersList = createAsyncThunk('users/getUsersList', ({ query }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getUsers(token, query)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setUsersList({ users: data.users })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', ({ id }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  getUser(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentUser({ user: data.user })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const createNewUser = createAsyncThunk('users/createNewUser', ({ user, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());

  createUser(token, user)
  .then(response => response.status === 201 ? response.json() : Promise.reject(response))
  .then(data => callback(data.user))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const updateCurrentUser = createAsyncThunk('users/updateCurrentUser', ({ id, user }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateUser(token, id, user)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(data => dispatch(setCurrentUser({ user: data.user })))
  .then(() => dispatch(showAlert({ message: 'Usuario actualizado', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const deleteCurrentUser = createAsyncThunk('users/deleteCurrentUser', ({ id, callback }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  updateUser(token, id)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => dispatch(showAlert({ message: 'Usuario eliminado', type: 'success' })))
  .then(() => callback())
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});

export const resetCurrentUserPassword = createAsyncThunk('users/resetCurrentUserPassword', ({ id, password }, { getState, dispatch }) => {
  const { token } = getState().auth;

  dispatch(startLoading());
  
  resetUserPassword(token, id, password)
  .then(response => response.status === 200 ? response.json() : Promise.reject(response))
  .then(() => dispatch(showAlert({ message: 'Contraseña restablecida', type: 'success' })))
  .catch(err => dispatch(handleError(err)))
  .finally(() => dispatch(endLoading()));
});
