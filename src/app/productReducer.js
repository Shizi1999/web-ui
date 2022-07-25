import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '~/api/axiosClient';

const initialState = {
  productType: [],
  currentProduct: {
    isEmty: true,
    product: { types: [] },
  },
};
// Thunk
export const getProductType = createAsyncThunk('getProductType', async () => {
  const response = await axiosClient.get('/product/types');
  return response;
});

export const getOneProduct = createAsyncThunk('getOneProduct', async (slug) => {
  const response = await axiosClient.get('/product/getproduct', { params: { slug: slug } });
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
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      if (action.payload.code === 0) {
        state.currentProduct = { isEmty: true, product: {} };
      } else {
        state.currentProduct = { isEmty: false, product: action.payload.product };
      }
    });
  },
});

export default homeSlice.reducer;
