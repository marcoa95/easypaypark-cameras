import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: [],
}

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setRecordsList: (state, { payload }) => ({ ...state, list: [...payload.records] }),
    setCurrentRecord: (state, { payload }) => ({ ...state, current: { ...payload.record } }),
    resetRecordsState: () => ({ list: [], current: { } })
  }
});

export const { setRecordsList, setCurrentRecord, resetRecordsState } = recordsSlice.actions;
export default recordsSlice.reducer;
