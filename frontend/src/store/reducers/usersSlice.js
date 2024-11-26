import {createSlice} from "@reduxjs/toolkit";
import {deleteUser, fetchUsers} from "./actionCreators";

const initialState = {
    users: [],
    status: "IDLE",
    error: null,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = "LOADING";
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.users = action.payload;
            state.error = null;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.error.message;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.status = "LOADING";
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            state.users = state.users.filter((user) => user._id !== action.payload._id);
            state.error = null;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.error.message;
        });
    }
});

export default usersSlice.reducer;