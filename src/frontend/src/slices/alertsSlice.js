import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  message: '',
  type: 'info'
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showAlert: (_, { payload }) => ({ show: true, message: payload.message, type: payload.type }),
    closeAlert: () => ({ show: false, message: '', type: 'info' })
  }
});

export const { showAlert, closeAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
