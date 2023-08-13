import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {CommentRequest, Like, Post, PostRequest} from "../../types";
import { RootState } from "../../store/store";
 
const URL:string="http://localhost:8083/api/posts/PostswithComments"
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<Post[]>(
        URL
      );
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const addComment = createAsyncThunk(
  "posts/addComment",
  async (comment: CommentRequest, thunkApi) => {
    try {
      const response = await axios.post<Comment>(`${URL}/${comment.postId}/comments`, comment);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: PostRequest, thunkApi) => {
    try {
      // Replace the URL with the actual endpoint to create a new post
      const response = await axios.post<Post>(URL, newPost);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (like: Like,thunkApi) => {
    
    try {
      const URL = `http://localhost:8082/POST-SERVICE/api/posts/${like.postId}/like/${like.userId}`; // Replace with the actual URL to like the post
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
  async (like: Like,thunkApi) => {
    
    try {
      const URL = `http://localhost:8082/POST-SERVICE/api/posts/${like.postId}/dislike/${like.userId}`; // Replace with the actual URL to like the post
      const response = await axios.post<Post>(URL);
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
      })
      .addCase(likePost.pending, (state, action) => {
       
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
            state.data[likedPostIndex].likes=action.payload.likes;
          }
        }
       
      })
      .addCase(likePost.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(dislikePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;

        // Find the index of the liked post in the state data
        if(state.data!=null){
          const likedPostIndex = state.data?.findIndex(
            (post) => post.id === action.payload.id
          );
  
          // If the liked post is found in the state data, update its like count
          if (likedPostIndex !== undefined && likedPostIndex !== -1) {
            state.data[likedPostIndex].likes=action.payload.likes;
          }
        }
       
      })
        
       
      .addCase(dislikePost.rejected, (state, action:PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
  
        // If the new post is successfully created, add it to the state data
        if (state.data) {
          state.data.push(action.payload);
        }
      })
      .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
       .addCase(addComment.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;

      // Find the post to which the comment was added
      const postIndex = state.data?.findIndex((post) => post.id === action.payload.postId);

      // If the post is found, add the new comment to its comments array
      if (postIndex !== undefined && postIndex !== -1) {
        if (!state.data![postIndex].comments) {
          state.data![postIndex].comments = [];
        }
        state.data![postIndex].comments.push(action.payload);
      }
    })
    .addCase(addComment.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
    
  
});

export const selectPost= (state: RootState) => state.post;


export default postSlice.reducer;