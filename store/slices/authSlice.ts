import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
    authState: boolean;
    server: string;
    posts: any [];
    portfolios: any ;
}

// Initial state
const initialState: AuthState = {
    authState: false,
    server: '',
    posts: [],
    portfolios: {},
};
// Actual Slice
// @ts-ignore
// @ts-ignore
export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        // Action to set the authentication status
        setAuthState(state, action) {
            state.authState = action.payload;
        },
        // Action to set the authentication status
        setServerState(state, action: PayloadAction<string>) {
            state.server = action.payload;
        },

        setPosts(state, action: PayloadAction<any[]>) {
            state.posts = action.payload;
        },

        setPortfolios(state, action: PayloadAction<any[]>) {
            state.portfolios = action.payload;
        },



    },

    extraReducers: (builder) => {
        builder
            .addCase(createAction<AppState>(HYDRATE), (state, action) => {
                // action is inferred correctly here if using TS
                state = action.payload.auth
                return state
            })
    },
});

export const { setAuthState, setServerState, setPosts, setPortfolios } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectServerState = (state: AppState) => state.auth.server;
export const selectPosts = (state: AppState) => state.auth.posts;
export const selectPortfolios = (state: AppState) => state.auth.portfolios;

export default authSlice.reducer;
