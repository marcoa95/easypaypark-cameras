import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
  list: [],
  meta: {}
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersList: (state, { payload }) => ({ ...state, list: [...payload.users] }),
    setCurrentUser: (state, { payload }) => ({ ...state, current: { ...payload.user } }),
    setUsersMeta: (state, { payload }) => ({ ...state, meta: { ...payload.users } }),
    resetUsersState: () => ({ list: [], current: { }, meta: { } })
  }
});

export const { setUsersList, setCurrentUser, setUsersMeta, resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;
