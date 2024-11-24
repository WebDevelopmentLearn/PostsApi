import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:3400" || process.env.REACT_APP_BACKEND_URL;

export const registerUser = createAsyncThunk("auth/register", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});


export const login = createAsyncThunk("auth/login", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);

        return response.data;
        // return rejectWithValue(result);
    } catch (error) {

        return rejectWithValue(error);
    }
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/auth/profile`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue}) => {
    try {
        await axios.post(`${API_URL}/auth/logout`);
        return null;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const createPost = createAsyncThunk("posts/createPost", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});