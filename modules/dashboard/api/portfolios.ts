import {cointrackApi} from "../../../store/services/cointrack";

export interface GetCatFactRequest {
    factLength?: number;
    factsLimit?: number;
    someSameArg: number;
}

export interface GetCatFactResponse {
    current_page: number;
    data: any[];
    total: number;
}

export const portfoliosApi = cointrackApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserPortfolio: builder.query<any, number>({
            query: (e) => ({
                url: `portfolios/all`,
                method: 'GET',
                onSuccess:  (dispatch, data) => {
                    const response = data as GetCatFactResponse;

                    //dispatch(setFacts(response.data));
                },
            }),
            keepUnusedDataFor: 1,
        }),
    }),
});

export const { useGetUserPortfolioQuery } = portfoliosApi
