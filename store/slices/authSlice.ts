import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {HYDRATE} from "next-redux-wrapper";

export interface UserPlan {
    endAt?: Date | null
    id?: string | null
    planId?: string | null
    userId?: number | null
    startAt?: string | null
}

export interface User {
    id: number
    avatarUrl?: string
    email: string
    firstName: string | null
    lastName: string | null
    roles: string[]
    isEmailVerified: boolean
    isTwoFactorAuthenticationEnabled: boolean,
    planId?: string,
    subscriptionId?: string;
    subscriptionStartAt?: Date;
    subscriptionEndAt?: Date | null;
    planName?: string;
    exchangeConnectionsLimit?: number;
    walletConnectionsLimit?: number;
    transactionsLimit?: number;
    alertCombinationsLimit?: number;
    personalAccountManager?: boolean;
    portfolioUpdates?: string;
    trialPeriod?: number;
}

// Type for our state
export interface AuthState {
    authState: boolean;
    accessToken: string | null,
    refreshToken: string | null,
    user?: User;
}

// Initial state
const initialState: AuthState = {
    authState: false,
    accessToken: null,
    refreshToken: null,
    user: {
        id: 0,
        avatarUrl: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: [],
        isEmailVerified: false,
        isTwoFactorAuthenticationEnabled: false,

    },
};
// Actual Slice
// @ts-ignore
// @ts-ignore
export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        // Action to set the authentication status
        setAuthState(state, action: PayloadAction<boolean>) {
            state.authState = action.payload;
        },
        setTokens(state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        // Action to set the authentication status
    },

    extraReducers: (builder) => {
        builder
            .addCase(createAction<AppState>(HYDRATE), (state, action) => {
                // action is inferred correctly here if using TS
               // state = action.payload.auth
                return state
            })
    },
});

export const {setAuthState, setUser, setTokens} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUser = (state: AppState) => state.auth.user;
export const selectTokens = (state: AppState) => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.accessToken
});

export default authSlice.reducer;
