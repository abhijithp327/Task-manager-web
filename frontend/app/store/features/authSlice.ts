"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../actions/auth";


const initialState = {
    // register
    isUserRegistering: false,
    isUserRegistered: false,
    isUserRegisterError: false
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



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default authSlice.reducer;