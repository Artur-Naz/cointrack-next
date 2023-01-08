import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {HYDRATE} from "next-redux-wrapper";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

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
    authState: boolean | null;
    accessToken?: string,
    refreshToken?: string,
    user?: User;
}

// Initial state
const initialState: AuthState = {
    authState: null,
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

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setAuthState(state, action: PayloadAction<boolean>){
            state.authState = action.payload;
        },

        login(state, action: PayloadAction<{ accessToken: string,  user: User }>) {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.authState = true;
        },
        logout(state){
            state.accessToken = undefined;
            state.user = {...initialState.user} as User;
            state.authState = false;
        },
        setToken(state, action: PayloadAction<string | undefined>) {
            state.accessToken = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createAction<AppState>(HYDRATE), (state, action) => {
               // state = action.payload.auth
                return state
            })
    },
});

export const {login, logout, setUser, setToken, setAuthState} = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUser = (state: AppState) => state.auth.user;
export const selectTokens = (state: AppState) => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.accessToken
});

export default persistReducer({ key:authSlice.name, blacklist: ['authState', 'accessToken', 'refreshToken'], storage}, authSlice.reducer);
