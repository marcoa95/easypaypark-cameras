import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: [],
  today: [],
}

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setRecordsList: (state, { payload }) => ({ ...state, list: [...payload.records] }),
    setRecordsToday: (state, { payload }) => ({ ...state, today: [...payload.records] }),
    setNewRecordToday: (state, { payload }) => ({ ...state, today: [state.today, payload.record] }),
    setCurrentRecord: (state, { payload }) => ({ ...state, current: { ...payload.record } }),
    resetRecordsState: state => ({ list: [], current: { }, today: state.today })
  }
});

export const { setRecordsList, setRecordsToday, setNewRecordToday, setCurrentRecord, resetRecordsState } = recordsSlice.actions;
export default recordsSlice.reducer;
