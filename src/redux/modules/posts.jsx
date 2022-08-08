import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// initialState
const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  error: null,
};

// createAsyncThunk - extraReducer
export const ___createPost = createAsyncThunk(
  "posts/__createPost",
  async (new_post, thunkAPI) => {
    try {
      // console.log(new_post);
      const response = await axios.post(
        "http://localhost:3001/posts", new_post
      )
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __getPosts = createAsyncThunk(
  "posts/__getPosts",
  async (args, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      // console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __deletePost = createAsyncThunk(
  "posts/__deletePost",
  async (post_id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${post_id}`);
      return thunkAPI.fulfillWithValue(post_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __getPost = createAsyncThunk(
  "posts/__getPost",
  async (post_id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/posts/${post_id}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editPost = createAsyncThunk(
  "posts/__editPost",
  async (edit_info, thunkAPI) => {
    try {
      const { post_id, edit_post } = edit_info;
      const response = await axios.patch(
        `http://localhost:3001/posts/${post_id}`,
        edit_post
      );
      const edit_id = response.data.id;
      return thunkAPI.fulfillWithValue(edit_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)



// createSlice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [___createPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [___createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload)
    },
    [___createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPosts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deletePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      const target = state.posts.findIndex(
        (post) => post.id === action.payload
      );
      state.posts.splice(target, 1);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editPost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.success = action.payload
    },
    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    }
  }
})
export default postSlice.reducer;
