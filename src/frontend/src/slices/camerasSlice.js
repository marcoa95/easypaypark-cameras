import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: [],
}

const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {
    setCamerasList: (state, { payload }) => ({ ...state, list: [...payload.cameras] }),
    setCurrentCamera: (state, { payload }) => ({ ...state, current: { ...payload.camera } }),
    resetCamerasState: () => ({ list: [], current: { } })
  }
});

export const { setCamerasList, setCurrentCamera, resetCamerasState } = camerasSlice.actions;
export default camerasSlice.reducer;
