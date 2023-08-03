import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {Post} from "../../types";
import { RootState } from "../../store/store";
 
const URL:string="http://localhost:8083/api/posts"
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<Post[]>(
        URL
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

interface PostState {
  loading: boolean;
  error: string | null;
  data: Post[] | null;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
} as PostState;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});
export const selectPost= (state: RootState) => state.post;


export default postSlice.reducer;