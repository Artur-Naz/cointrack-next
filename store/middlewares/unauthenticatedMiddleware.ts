import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import {logout} from "../slices/authSlice";

export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
       // dispatch(logout());
    }

    return next(action);
};
