import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {AppState} from "../../../store/store";
import {portfoliosApi} from "../api/portfoliosApi";


// Type for our state
export interface DashboardState {
    dashboardMenu: Record<string, boolean>,
    selectedPortfolio: string | null
    selectedTab: number
}

// Initial state
const initialState: DashboardState = {
    dashboardMenu: {},
    selectedPortfolio: null,
    selectedTab: 0,
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,

    reducers: {
        toggle(state, action: PayloadAction<string>) {
            state.dashboardMenu[action.payload] = !state.dashboardMenu[action.payload];
        },
        setDashboardTab(state, {payload}: PayloadAction<number>) {
            state.selectedTab = payload;
        },
        setSelectedPortfolio(state, action: PayloadAction<string>) {
            state.selectedPortfolio = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(createAction<AppState>(HYDRATE), (state, action) => {
                return state
            })
            .addMatcher(
                portfoliosApi.endpoints.getUserPortfolio.matchFulfilled, //.matchFulfilled,
                (state, {payload: {portfolios}}) => {
                    const dashboardMenu = portfolios.ids.reduce<Record<string, boolean>>((acc, id) => {
                        acc[id] = state.dashboardMenu[id] ?? false
                        return acc;
                    }, {})
                    return {...state, dashboardMenu}
                }
            )
    },
});

export const {toggle, setDashboardTab, setSelectedPortfolio} = dashboardSlice.actions;

export const selectCurrentTab = (state: AppState) => state.dashboard.selectedTab;
export const selectSelectedPortfolio = (state: AppState) => state.dashboard.selectedPortfolio;


export default persistReducer({key: dashboardSlice.name, storage}, dashboardSlice.reducer);
