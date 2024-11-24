import {createSlice} from "@reduxjs/toolkit";
import {createPost, deletePost, fetchPosts} from "./actionCreators";


const initialState = {
    posts: [],
    status: "IDLE",
    error: null,
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "LOADING";
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.posts = action.payload;
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload;
        }).addCase(createPost.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
        }).addCase(createPost.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload;
        }).addCase(deletePost.pending, (state) => {
            state.status = "LOADING";
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.posts = action.payload;
        }).addCase(deletePost.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload;
        })

        ;
    }
});

export default postsSlice.reducer;