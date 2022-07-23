import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '~/api/axiosClient';

const initialState = {
  productType: [],
};
// Thunk
export const getProductType = createAsyncThunk('getProductType', async () => {
  const response = await axiosClient.get('/product/types');
  return response;
});

export const homeSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    test: (state) => {
      console.log(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductType.fulfilled, (state, action) => {
      state.productType = action.payload;
    });
  },
});

export default homeSlice.reducer;
