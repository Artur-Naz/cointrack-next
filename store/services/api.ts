import { createApi } from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery, axiosBaseQueryFactory} from './axiosBaseQuery';

export const tagTypes = {
    catFacts: 'CatFacts',
} as const;

export type TagType = typeof tagTypes[keyof typeof tagTypes];

export const api = createApi({
    reducerPath: 'cointrackApi',
    baseQuery: axiosBaseQueryFactory({ baseURL: 'http://154.53.56.67:8008/api/v1/' }),
    tagTypes: Array.from(Object.values(tagTypes)),
    endpoints: () => ({}),
});
