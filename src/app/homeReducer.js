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

export const { setAction } = homeSlice.actions;
export default homeSlice.reducer;
