import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit'

export const unauthenticatedMiddleware: Middleware =
  ({  }) =>
  next =>
  action => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      //  dispatch(logout());
    }

    return next(action)
  }
