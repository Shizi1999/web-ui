import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeReducer';

const rootReducer = {
  home: homeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
