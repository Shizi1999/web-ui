import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeReducer';
import productReducer from './productReducer';

const rootReducer = {
  home: homeReducer,
  product: productReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
