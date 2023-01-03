import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {AppDispatch, AppState} from "../store";
import {getSession, signOut} from "next-auth/react";
import {ThunkDispatch} from "redux-thunk";
import {setToken} from "../slices/authSlice";

interface CustomQueryArgs extends AxiosRequestConfig {
    onSuccess?: (dispatch: AppDispatch, data: any) => Promise<void> | void;
    onError?: (dispatch: AppDispatch, data: any) => Promise<void> | void;
}

export type CustomBaseQueryType = BaseQueryFn<string | CustomQueryArgs, unknown, unknown>;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://154.53.56.67:8008/api/v1/',
    // withCredentials: true,
});


const onResponseFail = async (error: AxiosError & { config?: { alreadyRetried: boolean} }, dispatch: ThunkDispatch<any, any, any>) => {
    if (error.response?.status === 401 && !error.config?.alreadyRetried) {

        try {
            const { accessToken, err } = await getSession() as any

            if(!err){
                error.config!.alreadyRetried = true
                dispatch(setToken(accessToken))
                return await axiosInstance.request(error.config!)
            }

        } catch (err: any) {
            await signOut({ redirect: false })
        }
    }
    return Promise.reject(error);
};

const onRequest = (config:  AxiosRequestConfig<any>, state: AppState) => {
    console.log(state.auth.accessToken);
    config.headers = { Authorization: `Bearer ${state.auth?.accessToken}` };
    return config;
}

export const axiosBaseQuery: CustomBaseQueryType = async (fetchArgs, {dispatch, getState}, extraOptions) => {
    axiosInstance.interceptors.request.use((request) => onRequest(request, getState() as AppState))
    axiosInstance.interceptors.response.use(r => r,(error) => onResponseFail(error,dispatch))
    let result;
    try {
        if (typeof fetchArgs === 'string') {
            result = await axiosInstance.get(fetchArgs);
        } else {
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
            if (typeof fetchArgs !== 'string') {
                fetchArgs.onError && (await fetchArgs.onError(dispatch, error));
            }

        } catch (e) {
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
