import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {AppState} from "../../../store/store";


// Type for our state
export interface PortfolioState {
    portfolioMenu: Record<string, boolean>
}

// Initial state
const initialState: PortfolioState = {
    portfolioMenu: {}
};

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,

    reducers: {
        toggle(state, action: PayloadAction<{id: string, condition: boolean}>){
            state.portfolioMenu[action.payload.id] = action.payload.condition;
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

export const {toggle} = portfolioSlice.actions;


export default persistReducer({ key: portfolioSlice.name, storage}, portfolioSlice.reducer);
