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

            }),
            keepUnusedDataFor: 60 * 4,
        }),
    }),
});

export const { useGetUserPortfolioQuery } = portfoliosApi
