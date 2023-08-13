import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import PostReducer from '../features/posts/postSlice';
import commentReducer from'../features/comments/commentSlice'
export const store = configureStore({
  reducer: {

    auth: authReducer,
    post: PostReducer,
    comment: commentReducer
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