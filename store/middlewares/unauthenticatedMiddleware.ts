import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import {setAuthState} from "../slices/authSlice";

export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
        dispatch(setAuthState(false));
    }

    return next(action);
};
