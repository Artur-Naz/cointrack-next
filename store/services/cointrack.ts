import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {axiosBaseQuery, axiosBaseQueryFactory} from "./axiosBaseQuery";
import {tagTypes} from "./api";
//http://154.53.56.67:8008/api/v1/portfolios/all
// Define a service using a base URL and expected endpoints
export const cointrackApi = createApi({
    reducerPath: 'cointrackApi',

    baseQuery: axiosBaseQueryFactory({ baseURL: 'http://154.53.56.67:8008/api/v1/' }),
    tagTypes: Array.from(Object.values(tagTypes)),
    endpoints: () => ({}),

})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//export const { useGetUserPortfolioQuery } = cointrackApi
