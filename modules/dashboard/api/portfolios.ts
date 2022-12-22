import {cointrackApi} from "../../../store/services/cointrack";
import {BaseQueryMeta} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {PortfoliosResponse} from "./responses/portfolios.response";
import {createEntityAdapter} from "@reduxjs/toolkit";
import {api} from "../../../store/services/api";
import {createSelector} from "reselect";
import {AppState} from "../../../store/store";
export interface Portfolios {
    rates:     Rates;
    exchanges: ExchangeElement[];
    wallets:   WalletElement[];
}

export interface ExchangeElement {
    rates:    Rates;
    id:       string;
    name:     string;
    items:    ExchangeItem[];
    exchange: ExchangeExchange;
}

export interface ExchangeExchange {
    slug:  string;
    name:  string;
    image: string;
}

export interface ExchangeItem {
    rates:        Rates;
    id:           string;
    itemName:     string;
    name:         string;
    holdings:     Holding[];
    transactions: any[];
    positions:    Position[];
}

export interface Holding {
    id:       string;
    currency: string;
    slug:     null | string;
    balance:  number;
    coin:     Coin | null;
}

export interface Coin {
    name:                                string;
    image:                               string;
    currentPrice:                        number;
    marketCap:                           number;
    priceChange24H:                      number;
    priceChangePercentage24H:            number;
    priceChangePercentage14DInCurrency:  number | null;
    priceChangePercentage1HInCurrency:   number | null;
    priceChangePercentage1YInCurrency:   number | null;
    priceChangePercentage200DInCurrency: number | null;
    priceChangePercentage24HInCurrency:  number;
    priceChangePercentage30DInCurrency:  number;
    priceChangePercentage7DInCurrency:   number | null;
}

export interface Position {
    id:               string;
    positionAmt:      number;
    entryPrice:       number;
    unRealizedProfit: number;
    liquidationPrice: number;
}

export interface Rates {
    usd: Array<Array<number[]>>;
}

export interface WalletElement {
    rates:  Rates;
    id:     string;
    name:   string;
    items:  WalletItem[];
    wallet: WalletWallet;
}

export interface WalletItem {
    rates:         Rates;
    id:            string;
    name:          string;
    image:         null;
    walletChainId: string;
    holdings:      Holding[];
    transactions:  Transaction[];
}

export interface Transaction {
    id:       string;
    type:     Type;
    currency: string;
    slug:     null;
    amount:   number;
    fee:      number;
    date:     Date;
}

export enum Type {
    Fill = "fill",
}

export interface WalletWallet {
    name:  string;
    image: string;
}

export const assetsAdapter = createEntityAdapter<WalletElement | ExchangeElement>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (asset) => asset.id,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})
export const assetsItemAdapter = createEntityAdapter<ExchangeItem & WalletItem & { parentId: string}>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (asset) => asset.id,

    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const portfoliosApi = cointrackApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserPortfolio: builder.query<{ assets:any,assetItems:any  }, any>({
            query: (e) => ({
                url: `portfolios/all`,
                method: 'GET',

            }),
            providesTags: (result, error, arg) => [
                'portfolios',
            ],
            transformResponse(baseQueryReturnValue:PortfoliosResponse, meta, arg )  {
                console.log(baseQueryReturnValue);

                const assets = [...baseQueryReturnValue.exchanges, ...baseQueryReturnValue.wallets]
                const x = assets.map<ExchangeElement & WalletElement>((asset) => {
                    const {id,rates,name} = asset
                    const res:any = {
                        id, name, rates,
                    }
                    if('wallet' in asset){
                        res.wallet = asset.wallet
                    }else{
                        res.exchange = asset.exchange
                    }
                    res.itemIds = asset.items.map((item:any) => item.id)
                   return res
                })
                const items = assets.flatMap(asset => asset.items.map(item => ({...item, parentId: asset.id})))


                return {
                    assets:assetsAdapter.setAll(assetsAdapter.getInitialState(), x),
                    assetItems: assetsItemAdapter.setAll(assetsItemAdapter.getInitialState(), items as any)
                }
            }

        }),
    }),
});

export const { useGetUserPortfolioQuery } = portfoliosApi

export const selectPortfolios = portfoliosApi.endpoints.getUserPortfolio.select(undefined)

const selectAssets = createSelector(
    selectPortfolios,
    usersResult => usersResult?.data?.assets
)

// export const { selectAll: selectAllPortfolios, selectById: selectPortfolioById } =
//     assetsAdapter.getSelectors(state => selectAssets(state as AppState) ?? assetsAdapter.getInitialState())
