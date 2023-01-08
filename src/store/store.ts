import {configureStore, ThunkAction, Action, combineReducers} from "@reduxjs/toolkit";
import persistAuthSliceReducer, {authSlice} from "./slices/authSlice";
import { createWrapper } from "next-redux-wrapper";
import {cointrackApi} from "../services/cointrack";
import {unauthenticatedMiddleware} from "./middlewares/unauthenticatedMiddleware";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import persistDashboardSliceReducer, {dashboardSlice} from "../modules/dashboard/slices/dashboardSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    reconciliation: autoMergeLevel2,
    whitelist:[],
    timeout: 10,
    storage,
}

const makeStore = () =>{
    const persistedReducer = persistReducer(persistConfig, combineReducers({
        [authSlice.name]: persistAuthSliceReducer,
        [dashboardSlice.name]: persistDashboardSliceReducer,
        [cointrackApi.reducerPath]: cointrackApi.reducer,
    }))

return  configureStore({
        reducer: persistedReducer,
       middleware: (getDefaultMiddleware) =>
           [... getDefaultMiddleware({
               serializableCheck: {
                   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
           }),
               cointrackApi.middleware,
               unauthenticatedMiddleware
           ],
        devTools: true,
    });
}


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;

export const wrapper = createWrapper<AppStore>(makeStore);
