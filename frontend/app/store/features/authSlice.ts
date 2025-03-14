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

    // get user details
    isUserGettingDetails: false,
    isUserGotDetails: false,
    isUserGetDetailsError: false,

    // send verification link
    isUserSendingVerificationLink: false,
    isUserSentVerificationLink: false,
    isUserSendVerificationLinkError: false,

    // update email
    isUserUpdatingEmail: false,
    isUserUpdatedEmail: false,
    isUserUpdateEmailError: false,


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

export const getUserDetails = createAsyncThunk('getUserDetails', async (_, thunkAPI) => {
    try {
        const response = await auth.getUserDetails();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Get user details error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const sendVerificationLink = createAsyncThunk('sendVerificationLink', async (_, thunkAPI) => {
    try {
        const response = await auth.sendEmailVerificationLink();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Send verification link error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const updateEmail = createAsyncThunk('updateEmail', async (data: any, thunkAPI) => {
    try {
        const response = await auth.updateUserEmail(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Update email error:", error); // Log detailed error message
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

            // get user details

            .addCase(getUserDetails.pending, (state) => {
                state.isUserGettingDetails = true;
                state.isUserGotDetails = false;
                state.isUserGetDetailsError = false;
            })
            .addCase(getUserDetails.fulfilled, (state) => {
                state.isUserGettingDetails = false;
                state.isUserGotDetails = true;
                state.isUserGetDetailsError = false;
            })
            .addCase(getUserDetails.rejected, (state) => {
                state.isUserGettingDetails = false;
                state.isUserGotDetails = false;
                state.isUserGetDetailsError = true;
            })

            // send verification link

            .addCase(sendVerificationLink.pending, (state) => {
                state.isUserSendingVerificationLink = true;
                state.isUserSentVerificationLink = false;
                state.isUserSendVerificationLinkError = false;
            })
            .addCase(sendVerificationLink.fulfilled, (state) => {
                state.isUserSendingVerificationLink = false;
                state.isUserSentVerificationLink = true;
                state.isUserSendVerificationLinkError = false;
            })
            .addCase(sendVerificationLink.rejected, (state) => {
                state.isUserSendingVerificationLink = false;
                state.isUserSentVerificationLink = false;
                state.isUserSendVerificationLinkError = true;
            })

            // update email

            .addCase(updateEmail.pending, (state) => {
                state.isUserUpdatingEmail = true;
                state.isUserUpdatedEmail = false;
                state.isUserUpdateEmailError = false;
            })
            .addCase(updateEmail.fulfilled, (state) => {
                state.isUserUpdatingEmail = false;
                state.isUserUpdatedEmail = true;
                state.isUserUpdateEmailError = false;
            })
            .addCase(updateEmail.rejected, (state) => {
                state.isUserUpdatingEmail = false;
                state.isUserUpdatedEmail = false;
                state.isUserUpdateEmailError = true;
            });
    },
});

export default authSlice.reducer;