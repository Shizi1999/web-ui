import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  action: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAction: (state) => {
      state.action = 'Test reducer';
    },
  },
});

export const { actions } = homeSlice;
export default homeSlice.reducer;
