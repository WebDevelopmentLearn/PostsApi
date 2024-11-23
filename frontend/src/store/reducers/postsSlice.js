import {createSlice} from "@reduxjs/toolkit";
import {fetchPosts} from "./actionCreators";


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
        });
    }
});

export default postsSlice.reducer;