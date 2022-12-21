import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {HYDRATE} from "next-redux-wrapper";
import Cookies from "universal-cookie"
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
const cookies = new Cookies();
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
        setAuthState(state, action: PayloadAction<boolean>){
            state.authState = action.payload;
        },
        // Action to set the authentication status
        login(state, action: PayloadAction<{ accessToken: string, refreshToken: string, user: User }>) {
            cookies.set('accessToken', action.payload.accessToken,{ path:'/' })
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.authState = true;
        },
        logout(state){
            console.log('dispatch logout');
            cookies.remove('accessToken', { path:'/' })
            state.accessToken = null;
            state.user = {...initialState.user} as User;
            state.authState = false;
        },
        setTokens(state, action: PayloadAction<{ accessToken: string, refreshToken: string, user: User }>) {
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

export const {login, logout, setUser, setTokens, setAuthState} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUser = (state: AppState) => state.auth.user;
export const selectTokens = (state: AppState) => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.accessToken
});

export default persistReducer({ key:authSlice.name, blacklist: ['authState'], storage}, authSlice.reducer);
