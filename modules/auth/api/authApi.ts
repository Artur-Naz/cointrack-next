import {cointrackApi} from "../../../store/services/cointrack";



export const authApi = cointrackApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{accessToken: string}, {email: string, password: string}>({
            query: (e) => ({
                url: `auth/login`,
                method: 'POST',
                data:{
                    email:'testkiwi99@gmail.com',
                    password: 'Testkiwi-99'
                },
                onSuccess:  (dispatch, data: any) => {
                    const {accessToken, refreshToken} = data ;
                    localStorage.setItem("accessToken", accessToken)
                    localStorage.setItem("refreshToken", refreshToken)
                    //dispatch(setFacts(response.data));
                },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi
