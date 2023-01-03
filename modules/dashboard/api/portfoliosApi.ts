import {cointrackApi} from "../../../store/services/cointrack";
import {
    ExchangeElement,
    ExchangeItem, Holding,
    PortfoliosResponse, Rates,
    WalletElement,
    WalletItem
} from "./responses/portfolios.response";
import {createEntityAdapter, EntityState} from "@reduxjs/toolkit";

export type PortfolioEntity = (WalletElement | ExchangeElement) & { itemIds: string[] }
export type PortfolioItemEntity = (ExchangeItem | WalletItem) & { parentId: string, image?: string }
export const assetsAdapter = createEntityAdapter<PortfolioEntity>({
    selectId: (asset) => asset.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})
export const assetsItemAdapter = createEntityAdapter<PortfolioItemEntity>({
    selectId: (asset) => asset.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const holdingsAdapter = createEntityAdapter<Holding & { parentId: string }>({
    selectId: (asset) => asset.id,
    sortComparer: (a, b) => a.currency.localeCompare(b.currency),
})

export const portfoliosApi = cointrackApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserPortfolio: builder.query<{
            rates: Rates['usd']
            portfolios: EntityState<PortfolioEntity>,
            portfolioItems: EntityState<PortfolioItemEntity>,
            holdings: EntityState<Holding & { parentId: string }>
        }, any>({
            query: (e) => ({
                url: `portfolios/all`,
                method: 'GET',
                onSuccess:  (dispatch, data) => {
                    const response = data as GetCatFactResponse;

                    //dispatch(setFacts(response.data));
                },
            }),
            providesTags: (result, error, arg) => [
                {type: 'portfolios', id: 'LIST'},
            ],

            transformResponse(baseQueryReturnValue: PortfoliosResponse, meta, arg) {

                const assets = [...baseQueryReturnValue.exchanges, ...baseQueryReturnValue.wallets]
                const portfolios = assets.map<PortfolioEntity>((asset) => {
                    const {id, rates, name} = asset
                    const res: any = {
                        id, name, rates,
                    }
                    if ('wallet' in asset) {
                        res.wallet = asset.wallet
                    } else {
                        res.exchange = asset.exchange
                    }
                    res.itemIds = asset.items.map((item: any) => item.id)
                    return res
                })
                const items = assets.flatMap(asset => asset.items.map(item => {
                    let image;
                    if ('wallet' in asset) {
                        image = asset.wallet.image
                    } else {
                        image = asset.exchange.image
                    }
                    return {...item, parentId: asset.id, image}

                }))
                const holdings = items.flatMap(item => item.holdings.map(holding => ({...holding, parentId: item.id})))
                return {
                    rates: baseQueryReturnValue.rates.usd,
                    portfolios: assetsAdapter.setAll(assetsAdapter.getInitialState(), portfolios),
                    portfolioItems: assetsItemAdapter.setAll(assetsItemAdapter.getInitialState(), items as any),
                    holdings: holdingsAdapter.setAll(holdingsAdapter.getInitialState(), holdings),
                }
            }

        }),
    }),
});

export const {useGetUserPortfolioQuery} = portfoliosApi

// Can create a set of memoized selectors based on the location of this entity state
export const portfolioSelectors = assetsAdapter.getSelectors()
export const portfolioItemSelectors = assetsItemAdapter.getSelectors()
export const portfolioHoldingSelectors = holdingsAdapter.getSelectors()

