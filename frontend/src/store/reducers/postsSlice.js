import {createSlice} from "@reduxjs/toolkit";
import {createPost, deletePost, fetchPosts, uploadImage} from "./actionCreators";


const initialState = {
    posts: [],
    fetchPostsStatus: "IDLE",
    fetchPostsError: null,

    createPostStatus: "IDLE",
    createPostError: null,

    deletePostStatus: "IDLE",
    deletePostError: null,

    uploadImageStatus: "IDLE",
    uploadImageError: null,
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchPostsStatus = "LOADING";
            state.fetchPostsError = null;
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.fetchPostsStatus = "SUCCEEDED";
            state.posts = action.payload;
            state.fetchPostsError = null;
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.fetchPostsStatus = "FAILED";
            state.fetchPostsError = action.payload || "Failed to fetch posts";
        }).addCase(createPost.pending, (state, action) => {
            state.createPostStatus = "LOADING";
            state.createPostError = null;
        }).addCase(createPost.fulfilled, (state, action) => {
            state.createPostStatus = "SUCCEEDED";
            state.createPostError = null;
        }).addCase(createPost.rejected, (state, action) => {
            state.createPostStatus = "FAILED";
            state.createPostError = action.payload || "Failed to create post";
        }).addCase(deletePost.pending, (state) => {
            state.deletePostStatus = "LOADING";
            state.deletePostError = null;
        }).addCase(deletePost.fulfilled, (state, action) => {
            state.deletePostStatus = "SUCCEEDED";
            state.posts = action.payload;
            state.deletePostError = null;
        }).addCase(deletePost.rejected, (state, action) => {
            state.deletePostStatus = "FAILED";
            state.deletePostError = action.payload || "Failed to delete post";
        }).addCase(uploadImage.pending, (state) => {
            state.uploadImageStatus = "LOADING";
            state.uploadImageError = null;
        }).addCase(uploadImage.fulfilled, (state, action) => {
            state.uploadImageStatus = "SUCCEEDED";
            state.uploadImageError = null;
        }).addCase(uploadImage.rejected, (state, action) => {
            state.uploadImageStatus = "FAILED";
            state.uploadImageError = action.payload || "Failed to upload image";
        })
        ;
    }
});

export default postsSlice.reducer;