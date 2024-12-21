import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

axios.defaults.withCredentials = true;

export const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3400";

export const registerUser = createAsyncThunk("auth/register", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});


export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});


export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/auth/profile`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue}) => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

export const createPost = createAsyncThunk("posts/createPost", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, data, {
            withCredentials: true,  // Это позволяет отправить куки
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});


export const deletePost = createAsyncThunk("posts/deletePost", async (postId, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${API_URL}/posts/${postId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

// try {
//     const response = await axios.post('http://35.159.129.233:3400/api/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     setUploadStatus(response.data.message);
// } catch (error) {
//     setUploadStatus(error.response?.data?.error || 'Something went wrong!');
// }
export const uploadImage = createAsyncThunk("posts/uploadImage", async (formData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/api/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

export const uploadAvatar = createAsyncThunk("auth/uploadAvatar", async (formData, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${API_URL}/auth/upload-avatar`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

// export const updateUser = createAsyncThunk("users/updateUser", async (data, {rejectWithValue}) => {
//     try {
//         const response = await axios.put(`${API_URL}/users`, data);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// });

export const changePassword = createAsyncThunk("auth/changePassword", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${API_URL}/auth/change-password`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, {rejectWithValue}) => {
    try {
        console.log("Data: ", data);
        const response = await axios.post(`${API_URL}/auth/reset-password`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});


export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});


export const deleteUser = createAsyncThunk("users/deleteUser", async (userId, {rejectWithValue}) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                // If no custom message, return a general error
                return rejectWithValue('Something went wrong, please try again.');
            }
        }
        return rejectWithValue(error.message || 'Unknown error');
    }
});