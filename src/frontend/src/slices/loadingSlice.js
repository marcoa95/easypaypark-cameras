import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: () => ({ isLoading: true }),
    endLoading: () => ({ isLoading: false })
  }
});

export const { startLoading, endLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
