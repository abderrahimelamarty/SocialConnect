import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Comment, Post, PostRequest } from "../../types";
import { RootState } from "../../store/store";

const URL: string = "http://localhost:8083/api/posts";



export const createComment = createAsyncThunk(
  "comments/createComment",
  async (comment: Comment, thunkApi) => {
    try {
      // Replace the URL with the actual endpoint to create a new comment
      const response = await axios.post<Comment>(`${URL}/comments`, comment);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

interface CommentState {
  loading: boolean;
  error: string | null;
  data: Comment[] | null;
}

const initialCommentState = {
  loading: false,
  error: null,
  data: null,
} as CommentState;

const commentSlice = createSlice({
  name: "comment",
  initialState: initialCommentState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.loading = false;

        // If the new comment is successfully created, add it to the state data
        if (state.data) {
          state.data.push(action.payload);
        }
      })
      .addCase(createComment.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const selectComments = (state: RootState) => state.comment;

export default commentSlice.reducer;
