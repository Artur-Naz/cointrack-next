import { cointrackApi } from '../../../services/cointrack'
import {
  ExchangeElement,
  ExchangeItem,
  Holding,
  PortfoliosResponse,
  Rates,
  WalletElement,
  WalletItem
} from './responses/portfolios.response'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import {addJob, addJobs, Job, updateJob} from "../slices/dashboardSlice";
export type PortfolioState = number | 'done' | 'success' | 'error'
export type PortfolioEntity = (WalletElement | ExchangeElement) & { itemIds: string[], jobId: null | string }
export type PortfolioItemEntity = (ExchangeItem | WalletItem) & { parentId: string; image?: string, jobId: null | string }
export type GetUserPortfolioState = {
  rates: Rates['usd']
  portfolios: EntityState<PortfolioEntity>
  portfolioItems: EntityState<PortfolioItemEntity>
  holdings: EntityState<Holding & { parentId: string }>
}
export const assetsAdapter = createEntityAdapter<PortfolioEntity>({
  selectId: asset => asset.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})
export const assetsItemAdapter = createEntityAdapter<PortfolioItemEntity>({
  selectId: asset => asset.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

export const holdingsAdapter = createEntityAdapter<Holding & { parentId: string }>({
  selectId: asset => asset.id,
  sortComparer: (a, b) => a.currency.localeCompare(b.currency)
})

export const portfoliosApi = cointrackApi.injectEndpoints({
  endpoints: builder => ({
    getUserPortfolio: builder.query<GetUserPortfolioState,
      any
    >({
      query: () => ({
        url: `portfolios/all`,
        method: 'GET'
      }),
      providesTags: (result, error, arg) => [{ type: 'portfolios', id: 'LIST' }],

      transformResponse(baseQueryReturnValue: PortfoliosResponse, meta, arg) {
        const assets = [...baseQueryReturnValue.exchanges, ...baseQueryReturnValue.wallets]
        const portfolios = assets.map<PortfolioEntity>(asset => {
          const { id, rates, name } = asset
          const res: any = {
            id,
            name,
            rates
          }
          if ('wallet' in asset) {
            res.wallet = asset.wallet
          } else {
            res.exchange = asset.exchange
          }
          res.itemIds = asset.items.map((item: any) => item.id)
          res.jobId = null;

          return res
        })
        const items = assets.flatMap(asset =>
          asset.items.map(item => {
            let image
            if ('wallet' in asset) {
              image = asset.wallet.image
            } else {
              image = asset.exchange.image
            }

            return { ...item, parentId: asset.id, image, jobId: null }
          })
        )
        const holdings = items.flatMap(item => item.holdings.map(holding => ({ ...holding, parentId: item.id })))

        return {
          rates: baseQueryReturnValue.rates.usd,
          portfolios: assetsAdapter.setAll(assetsAdapter.getInitialState(), portfolios),
          portfolioItems: assetsItemAdapter.setAll(assetsItemAdapter.getInitialState(), items as any),
          holdings: holdingsAdapter.setAll(holdingsAdapter.getInitialState(), holdings)
        }
      }
    }),
    syncPortfolioById: builder.mutation<{ jobId: string }[], string>({
      query: (id: string) => ({
        url: `portfolios/sync/${id}`,
        method: 'GET'
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        const jobs = data.map<Job>(({jobId}) => ({ id: jobId, state: 0 }))
        // dispatch(cointrackApi.util.updateQueryData('getUserPortfolio', undefined, (draft: GetUserPortfolioState) => {
        //
        //   assetsAdapter.updateMany(draft.portfolios,  jobs.map(({ jobId }) => ({ id: jobId, changes: { jobId: data.jobId }}))  })
        // }))
         dispatch(addJobs(jobs))
      },
    }),
    syncPortfolioItemById: builder.mutation<{ jobId: string }, string>({
      query: (id: string) => ({
        url: `portfolios/syncItem/${id}`,
        method: 'GET'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(cointrackApi.util.updateQueryData('getUserPortfolio', undefined, (draft: GetUserPortfolioState) => {

          assetsItemAdapter.updateOne(draft.portfolioItems, { id, changes: { jobId: data.jobId }})
        }))
        dispatch(addJob({ id: data.jobId, state: 0 }))
      },
    })
  })
})

export const { useGetUserPortfolioQuery, useSyncPortfolioByIdMutation, useSyncPortfolioItemByIdMutation } = portfoliosApi

// Can create a set of memoized selectors based on the location of this entity state
export const portfolioSelectors = assetsAdapter.getSelectors()
export const portfolioItemSelectors = assetsItemAdapter.getSelectors()
export const portfolioHoldingSelectors = holdingsAdapter.getSelectors()
