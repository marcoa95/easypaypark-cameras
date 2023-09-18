import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  data: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => ({ ...state, token: payload.token }),
    setData: (state, { payload }) => ({ ...state, data: payload.data }),
    clearToken: () => ({ token: null, data: { } })
  }
});

export const { setToken, setData, clearToken } = authSlice.actions;
export default authSlice.reducer;
