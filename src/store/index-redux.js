
import {createSlice, configureStore} from '@reduxjs/toolkit';
import { authSlice } from './auth-redux';

const initialState = {
  manageEventListTrending: false,
  
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    manageEventListTrendingFunc(state) {
      state.manageEventListTrending = !state.manageEventListTrending;
    }
    
  },
});

const store = configureStore({
    reducer : { counter: counterSlice.reducer, auth:authSlice.reducer}
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;