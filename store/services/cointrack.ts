import { createApi } from '@reduxjs/toolkit/query/react'
import {axiosBaseQueryFactory} from "./axiosBaseQuery";
export const tagTypes = {
    auth: 'auth',
    portfolios: 'portfolios'
} as const;

export type TagType = typeof tagTypes[keyof typeof tagTypes];

// Define a service using a base URL and expected endpoints
export const cointrackApi = createApi({
    reducerPath: 'cointrackApi',

    baseQuery: axiosBaseQueryFactory({ baseURL: 'http://154.53.56.67:8008/api/v1/' }),
    tagTypes: Array.from(Object.values(tagTypes)),
    endpoints: () => ({}),

})
