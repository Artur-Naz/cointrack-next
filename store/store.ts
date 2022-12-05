import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { createWrapper } from "next-redux-wrapper";
import {cointrackApi} from "./services/cointrack";

const makeStore = () =>{
   return  configureStore({
        reducer: {
            [authSlice.name]: authSlice.reducer,
            [cointrackApi.reducerPath]: cointrackApi.reducer,
        },
       middleware: (getDefaultMiddleware) =>
           getDefaultMiddleware().concat(cointrackApi.middleware),
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
