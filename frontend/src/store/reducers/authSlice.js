import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchUser, login, logout, refreshToken, registerUser} from "./actionCreators";


const initialState = {
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
    status: "IDLE",
    error: null,
    registerStatus: "IDLE",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.registerStatus = "LOADING";
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.registerStatus = "SUCCEEDED";
        }).addCase(registerUser.rejected, (state, action) => {
            state.registerStatus = "FAILED";
            console.log(action);
            state.error = action.payload.response.data;
        }).addCase(login.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.status = "SUCCEEDED";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(login.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(fetchUser.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(fetchUser.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(logout.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(logout.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logout.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(refreshToken.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(refreshToken.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        }).addCase(refreshToken.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        })
        ;
    }
});

export default authSlice.reducer;