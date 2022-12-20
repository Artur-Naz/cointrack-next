import {cointrackApi} from "../../../store/services/cointrack";
import {setAuthState, setTokens, setUser, User} from "../../../store/slices/authSlice";
import {LoginResponse} from "./responses/login.response";
import _ from "lodash"


export const authApi = cointrackApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string, password: string }>({
            query: (credentials: { email: string, password: string }) => ({
                url: `auth/login`,
                method: 'POST',
                data: {
                    email: 'testkiwi99@gmail.com',
                    password: 'Testkiwi-99'
                },
                onSuccess: (dispatch, data: LoginResponse) => {
                    const {accessToken, refreshToken, user} = data;
                    localStorage.setItem("accessToken", accessToken)
                    localStorage.setItem("refreshToken", refreshToken)
                    const normalizedUser: User = {
                        ...user,
                        planId: user.userPlan?.planId,
                        subscriptionId: user.userPlan?.id,
                        subscriptionStartAt: user.userPlan?.startAt,
                        subscriptionEndAt: user.userPlan?.endAt,
                        planName: user.userPlan?.currentPlan.name,
                        exchangeConnectionsLimit: user.userPlan?.currentPlan.exchangeConnectionsLimit,
                        walletConnectionsLimit: user.userPlan?.currentPlan.walletConnectionsLimit,
                        transactionsLimit: user.userPlan?.currentPlan.transactionsLimit,
                        alertCombinationsLimit: user.userPlan?.currentPlan.alertCombinationsLimit,
                        personalAccountManager: user.userPlan?.currentPlan.personalAccountManager,
                        portfolioUpdates: user.userPlan?.currentPlan.portfolioUpdates,
                        trialPeriod: user.userPlan?.currentPlan.trialPeriod,
                    }
                    dispatch(setUser(normalizedUser));
                    dispatch(setTokens({ accessToken, refreshToken }));
                    dispatch(setAuthState(true));
                },
            }),
        }),
        // refreshToken: builder.mutation<{ refreshToken: string, accessToken: string }, { refreshToken: string }>({
        //     query: (refreshToken: string) => ({
        //         url: `auth/refresh`,
        //         method: 'POST',
        //         data: {
        //             refreshToken
        //         },
        //         onSuccess: (dispatch, data: LoginResponse) => {
        //             console.log(data);
        //             const {accessToken, refreshToken} = data;
        //         },
        //     }),
        // }),
    }),
});

export const {useLoginMutation} = authApi
