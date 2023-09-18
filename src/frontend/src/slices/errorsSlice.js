import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  errors: []
}

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    showError: (_, { payload }) => ({ show: true, errors: [...payload.errors] }),
    closeError: () => ({ show: false, errors: [] })
  }
});

export const handleError = createAsyncThunk('errors/handleError', async (err, { dispatch }) => {
  try {
    console.error(err);

    if(err.json) {
      const error = await err.json();

      console.error(error);

      const errorMessages = [
        error.error?.message ?? 'No especificado',
        ...(error.error?.errors?.map?.(error => error.msg) ?? [])
      ];

      return dispatch(showError({ errors: errorMessages }));
    }
  
    throw err;
  } catch(err) {
    dispatch(showError({ errors: ['Error desconocido'] }));
  }
});

export const { showError, closeError } = errorsSlice.actions;
export default errorsSlice.reducer;
