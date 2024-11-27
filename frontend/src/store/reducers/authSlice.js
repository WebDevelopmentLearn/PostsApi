import {createSlice} from "@reduxjs/toolkit";
import {
    changePassword,
    fetchUser,
    forgotPassword,
    login,
    logout,
    registerUser,
    resetPassword,
    uploadAvatar
} from "./actionCreators";


const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    status: "IDLE",
    error: null,
    registerStatus: "IDLE",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearStatus(state, action) {
            state[action.payload] = "IDLE";
            state.error = null;
        }
    },
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
            state.status = "SUCCEEDED";
            state.token = action.payload.token;
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
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(logout.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(uploadAvatar.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(uploadAvatar.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
            if (state.user) {
                state.user.avatar = action.payload.avatar; // Обновляем аватар пользователя
            }
        }).addCase(uploadAvatar.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        })

        .addCase(changePassword.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(changePassword.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
        }).addCase(changePassword.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(forgotPassword.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(forgotPassword.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";

        }).addCase(forgotPassword.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        }).addCase(resetPassword.pending, (state, action) => {
            state.status = "LOADING";
            state.error = null;
        }).addCase(resetPassword.fulfilled, (state, action) => {
            state.status = "SUCCEEDED";
        }).addCase(resetPassword.rejected, (state, action) => {
            state.status = "FAILED";
            state.error = action.payload.response.data;
        })
        ;
    }
});

export default authSlice.reducer;
export const {clearStatus} = authSlice.actions;