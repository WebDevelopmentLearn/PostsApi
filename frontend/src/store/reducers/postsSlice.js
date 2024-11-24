import {createSlice} from "@reduxjs/toolkit";
import {createPost, deletePost, fetchPosts, uploadImage} from "./actionCreators";


const initialState = {
    posts: [],
    status: "IDLE",
    error: null,
    createPostStatus: "IDLE",
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
            state.error = action.payload.response.data;
        }).addCase(createPost.pending, (state, action) => {
            state.createPostStatus = "LOADING";
            state.error = null;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.createPostStatus = "SUCCEEDED";
            state.error = null;
        }).addCase(createPost.rejected, (state, action) => {
            state.createPostStatus = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(deletePost.pending, (state) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.posts = action.payload;
            state.error = null;
        }).addCase(deletePost.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(uploadImage.pending, (state) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(uploadImage.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.error = null;
        }).addCase(uploadImage.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        })
        ;
    }
});

export default postsSlice.reducer;