
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import fileReducer from './files/fileslSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: fileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
