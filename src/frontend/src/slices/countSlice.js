import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
}

const countsSlice = createSlice({
  name: 'counts',
  initialState,
  reducers: {
    setCount: (state, { payload }) => ({ ...state, count: payload.count }),
  }
});

export const { setCount } = countsSlice.actions;
export default countsSlice.reducer;
