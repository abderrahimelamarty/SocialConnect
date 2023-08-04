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
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId: number, thunkApi) => {
    try {
      const URL = `http://localhost:8082/POST-SERVICE/api/posts/${postId}/like`; // Replace with the actual URL to like the post
      const response = await axios.post<Post>(URL);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (postId:number) => {
    const URL = `http://localhost:8082/POST-SERVICE/api/posts/${postId}/dislike`; // Replace with the actual API endpoint for disliking a post
    const response = await axios.post(URL);
    return response.data;
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
      })
      .addCase(likePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;

        // Find the index of the liked post in the state data
        if(state.data!=null){
          const likedPostIndex = state.data?.findIndex(
            (post) => post.id === action.payload.id
          );
  
          // If the liked post is found in the state data, update its like count
          if (likedPostIndex !== undefined && likedPostIndex !== -1) {
            state.data[likedPostIndex].likes += 1;
          }
        }
       
      })
      .addCase(likePost.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        const dislikedPost = action.payload;
        if(state.data!=null){
          const updatedPosts = state.data.map((post) =>
          post.id === dislikedPost.id ? dislikedPost : post
        );
        state.data = updatedPosts;
        }
      })
        
       
      .addCase(dislikePost.rejected, (state, action:PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const selectPost= (state: RootState) => state.post;


export default postSlice.reducer;