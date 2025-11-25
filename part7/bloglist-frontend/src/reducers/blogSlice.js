import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      const blogs = action.payload.blogs;
      state.blogs = blogs;
    },
  },
});

export const { setBlogs } = blogSlice.actions;

export const setBlogsAfterFetching = (blogs) => {
  return (dispatch) => {
    if (Array.isArray(blogs) && blogs.length > 0) {
      dispatch(setBlogs);
    }
  };
};

export default blogSlice.reducer;
