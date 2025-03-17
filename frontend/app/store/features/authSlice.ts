"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../actions/auth";



const initialState = {

    user: null,
    isLoggedIn: false,

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

    // verify email 
    isUserVerifyingEmail: false,
    isUserVerifiedEmail: false,
    isUserVerifyEmailError: false,

    // logout
    isUserLoggingOut: false,
    isUserLoggedOut: false,
    isUserLogoutError: false,

    // forgot password
    isUserSendingForgotPasswordLink: false,
    isUserSentForgotPasswordLink: false,
    isUserSendForgotPasswordLinkError: false,

    // reset password
    isUserResettingPassword: false,
    isUserResetPassword: false,
    isUserResetPasswordError: false,

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

export const verifyEmail = createAsyncThunk('verifyEmail', async (data: any, thunkAPI) => {
    try {
        const response = await auth.verifyEmail(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Verify email error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const logoutUser = createAsyncThunk('logoutUser', async (_, thunkAPI) => {
    try {
        const response = await auth.logoutUser();
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Logout error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const forgotPassword = createAsyncThunk('forgotPassword', async (data: any, thunkAPI) => {
    try {
        const response = await auth.forgotPassword(data);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Forgot password error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const resetPassword = createAsyncThunk('resetPassword', async ({ data, token }: { data: any; token: string }, thunkAPI) => {
    try {
        const response = await auth.resetPassword(data, token);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
        console.log("Reset password error:", error); // Log detailed error message
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.result;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
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
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isUserLoggingIn = false;
                state.isUserLoggedIn = true;
                state.isUserLoginError = false;
                state.user = action.payload.result;
                state.isLoggedIn = true;
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
            })

            // verify email

            .addCase(verifyEmail.pending, (state) => {
                state.isUserVerifyingEmail = true;
                state.isUserVerifiedEmail = false;
                state.isUserVerifyEmailError = false;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isUserVerifyingEmail = false;
                state.isUserVerifiedEmail = true;
                state.isUserVerifyEmailError = false;
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.isUserVerifyingEmail = false;
                state.isUserVerifiedEmail = false;
                state.isUserVerifyEmailError = true;
            })

            // logout

            .addCase(logoutUser.pending, (state) => {
                state.isUserLoggingOut = true;
                state.isUserLoggedOut = false;
                state.isUserLogoutError = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isUserLoggingOut = false;
                state.isUserLoggedOut = true;
                state.isUserLogoutError = false;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isUserLoggingOut = false;
                state.isUserLoggedOut = false;
                state.isUserLogoutError = true;
            })

            // forgot password

            .addCase(forgotPassword.pending, (state) => {
                state.isUserSendingForgotPasswordLink = true;
                state.isUserSentForgotPasswordLink = false;
                state.isUserSendForgotPasswordLinkError = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isUserSendingForgotPasswordLink = false;
                state.isUserSentForgotPasswordLink = true;
                state.isUserSendForgotPasswordLinkError = false;
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.isUserSendingForgotPasswordLink = false;
                state.isUserSentForgotPasswordLink = false;
                state.isUserSendForgotPasswordLinkError = true;
            })

            // reset password

            .addCase(resetPassword.pending, (state) => {
                state.isUserResettingPassword = true;
                state.isUserResetPassword = false;
                state.isUserResetPasswordError = false;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isUserResettingPassword = false;
                state.isUserResetPassword = true;
                state.isUserResetPasswordError = false;
            })
            .addCase(resetPassword.rejected, (state) => {
                state.isUserResettingPassword = false;
                state.isUserResetPassword = false;
                state.isUserResetPasswordError = true;
            })
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;