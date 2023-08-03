import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import PostReducer from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {

    auth: authReducer,
    post: PostReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;