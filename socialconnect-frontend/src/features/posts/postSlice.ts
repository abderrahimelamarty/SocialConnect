import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {CommentRequest, Comment, Like, Post, PostRequest} from "../../types";
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
      
      return response.data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
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
      const URL = `http://localhost:8083/api/posts/${comment.postId}/comments`;
      const response = await axios.post<Comment>(URL, comment);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (comment:any, thunkApi) => {
    try {
      const URL = `http://localhost:8083/api/comments/${comment.id}`;
      await axios.delete(URL);
      return comment;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId:number, thunkApi) => {
    try {
      const URL = `http://localhost:8083/api/posts/${postId}`;
      await axios.delete(URL);
      return postId;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: PostRequest, thunkApi) => {
    const URL="http://localhost:8083/api/posts"
    try {
      const response = await axios.post<Post>(URL, newPost);
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post, thunkApi) => {
    const URL=`http://localhost:8083/api/posts/${post.id}`
    try {

      const response = await axios.put<Post>(URL, post);
      console.log(response.data)
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
      const URL = `http://localhost:8083/api/posts/${like.postId}/like/${like.userId}`; // Replace with the actual URL to like the post
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
      const URL = `http://localhost:8083/api/posts/${like.postId}/dislike/${like.userId}`; // Replace with the actual URL to like the post
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
  showPostModal:boolean;
  editPostObj: any,
}

const initialState = {
  loading: false,
  error: null,
  data: null,
  showPostModal: false,
  editPostObj: null,
} as PostState;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    openPostModal: state => {
        state.showPostModal = true;
    },
    closePostModal: state => {
        state.showPostModal = false;
    },
    setEditPostObj: (state, { payload }) => {
        state.editPostObj = payload;
    },
},
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
    
    })
    .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
  
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
    })
     .addCase(deleteComment.pending, (state) => {
    
    })
    .addCase(deleteComment.fulfilled, (state, action:PayloadAction<Comment>) => {
      // Find the post that contains the comment to be deleted
      const postIndex = state.data?.findIndex((post) => post.id === action.payload.postId);
      
      if (postIndex !== undefined && postIndex !== -1) {
        // Remove the comment from the post's comments array
        state.data![postIndex].comments = state.data![postIndex].comments.filter(comment => comment.id !== action.payload.id);
      }
      state.loading = false;
    })
    .addCase(deleteComment.rejected, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deletePost.pending, (state) => {
      
      state.error = null;
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      if (state.data) {
        // Remove the deleted post from the data array
        state.data = state.data.filter(post => post.id !== action.payload);
      }
      state.loading = false;
    })
    .addCase(deletePost.rejected, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase(updatePost.pending, (state, action) => {
      // state.loading = true;
    })
    .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.loading = false;

      // Find the index of the updated post in the state data
      const updatedPostIndex = state.data?.findIndex(
        (post) => post.id === action.payload.id
      );

      // If the updated post is found in the state data, replace it with the updated data
      if (updatedPostIndex !== undefined && updatedPostIndex !== -1) {
        state.data![updatedPostIndex] = action.payload;
      }

      // Clear the editPostObj if it was set for editing
      state.editPostObj = null;
    })
    .addCase(updatePost.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    }); 
},  
});
export const { setEditPostObj, closePostModal, openPostModal } = postSlice.actions
export const selectPost= (state: RootState) => state.post;
export default postSlice.reducer;