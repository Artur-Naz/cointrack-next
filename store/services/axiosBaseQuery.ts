import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {AxiosError, AxiosRequestConfig} from 'axios';
import axiosInstance from './axiosInstance';
import {AppDispatch, AppState} from "../store";

interface CustomQueryArgs extends AxiosRequestConfig {
    onSuccess?: (dispatch: AppDispatch, data: any) => Promise<void> | void;
    onError?: (dispatch: AppDispatch, data: any) => Promise<void> | void;
}

export type CustomBaseQueryType = BaseQueryFn<string | CustomQueryArgs, unknown, unknown >;

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
    | {
    error: E
    data?: undefined
    meta?: M
}
    | {
    error?: undefined
    data: T
    meta?: M
}
export const axiosBaseQuery:CustomBaseQueryType = async (fetchArgs, {dispatch, getState}, extraOptions) => {
   let result;
    try {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${(getState() as AppState).auth.accessToken}`;
        if( typeof fetchArgs === 'string'){
             result = await axiosInstance.get(fetchArgs);
        }else{
            const {onSuccess, onError, ...args} = fetchArgs

            result = await axiosInstance.request(args);
            if (onSuccess) {
                //errors doesn't throw up, so we need to use try catch here
                try {
                    await onSuccess(dispatch, result.data);
                } catch (e) {
                    console.error('Error in onSuccess method', e);
                    throw e;
                }
            }
        }



        return {data: result.data};
    } catch (error: unknown) {
        const err = error as AxiosError;
        try {
            if( typeof fetchArgs !== 'string'){
                fetchArgs.onError && (await fetchArgs.onError(dispatch, error));
            }

        }catch (e) {
            console.error('Error in onError method', e);
            throw e;
        }
        return {
            error: err.response?.data,
        };
    }
};

export const axiosBaseQueryFactory = (options: { baseURL: string }) => {
    axiosInstance.defaults.baseURL = options.baseURL;
    return axiosBaseQuery
}
