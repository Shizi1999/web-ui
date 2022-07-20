import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '~/api/axiosClient';

const initialState = {
  isLogin: false,
  user: { email: '', name: '', adress: '', avatar: '', phone: '' },
};
// Thunk
export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  const response = await axiosClient.get('/user');
  return response;
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.setItem('TheDrink', '');
      state.isLogin = false;
      state.user = {
        name: '',
        adress: '',
        avatar: '',
        phone: '',
        email: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const login = action.payload.code === 1;
      state.isLogin = login;
      state.user = {
        ...action.payload,
      };
    });
  },
});

export const { logOut } = homeSlice.actions;
export default homeSlice.reducer;
