"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../actions/auth";


const initialState = {
    // register
    isUserRegistering: false,
    isUserRegistered: false,
    isUserRegisterError: false,

    // login
    isUserLoggingIn: false,
    isUserLoggedIn: false,
    isUserLoginError: false,

};



export const registerUser = createAsyncThunk('registerUser', async (data: any, thunkAPI) => {
    try {
        const response = await auth.register(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Register error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const loginUser = createAsyncThunk('loginUser', async (data: any, thunkAPI) => {
    try {
        const response = await auth.login(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Login error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // register

            .addCase(registerUser.pending, (state) => {
                state.isUserRegistering = true;
                state.isUserRegistered = false;
                state.isUserRegisterError = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isUserRegistering = false;
                state.isUserRegistered = true;
                state.isUserRegisterError = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isUserRegistering = false;
                state.isUserRegistered = false;
                state.isUserRegisterError = true;
            })

            // login

            .addCase(loginUser.pending, (state) => {
                state.isUserLoggingIn = true;
                state.isUserLoggedIn = false;
                state.isUserLoginError = false;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isUserLoggingIn = false;
                state.isUserLoggedIn = true;
                state.isUserLoginError = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isUserLoggingIn = false;
                state.isUserLoggedIn = false;
                state.isUserLoginError = true;
            })
    },
});

export default authSlice.reducer;