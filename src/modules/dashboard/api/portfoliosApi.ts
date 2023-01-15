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
import { Job, PortfolioState, upsertJob, upsertJobs } from '../slices/jobSlice'

export type PortfolioEntity = (WalletElement | ExchangeElement) & { itemIds: string[] }
export type PortfolioItemEntity = (ExchangeItem | WalletItem) & {
  parentId: string
  image?: string
}
export type Rate = { timestamp: number; usd: number; btc?: number; eth?: number }
export type PortfolioHoldingEntity = Holding & { parentId: string }
export type RatesEntity = { id: string; minutely: Rate[]; hourly: Rate[]; daily: Rate[] }
export type GetUserPortfolioState = {
  rates: EntityState<RatesEntity>
  portfolios: EntityState<PortfolioEntity>
  portfolioItems: EntityState<PortfolioItemEntity>
  holdings: EntityState<PortfolioHoldingEntity>
}
export const assetsAdapter = createEntityAdapter<PortfolioEntity>({
  selectId: asset => asset.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})
export const assetsItemAdapter = createEntityAdapter<PortfolioItemEntity>({
  selectId: asset => asset.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

export const holdingsAdapter = createEntityAdapter<PortfolioHoldingEntity>({
  selectId: holding => holding.id,
  sortComparer: (a, b) => a.currency.localeCompare(b.currency)
})

export const ratesAdapter = createEntityAdapter<RatesEntity>({
  selectId: rates => rates.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const transformRates = (id: string, rates: Rates) => ({
  id,
  minutely: rates?.[0]?.map(([timestamp, usd, btc, eth]) => ({ timestamp, usd, btc, eth })) ?? [],
  hourly: rates?.[1]?.map(([timestamp, usd, btc, eth]) => ({ timestamp, usd, btc, eth })) ?? [],
  daily: rates?.[2]?.map(([timestamp, usd, btc, eth]) => ({ timestamp, usd, btc, eth })) ?? []
})
export const portfoliosApi = cointrackApi.injectEndpoints({
  endpoints: builder => ({
    getUserPortfolio: builder.query<GetUserPortfolioState, any>({
      query: () => ({
        url: `portfolios/all`,
        method: 'GET'
      }),
      providesTags: (result, error, arg) => [{ type: 'portfolios', id: 'LIST' }],

      transformResponse(baseQueryReturnValue: PortfoliosResponse, meta, arg) {
        const assets = [...baseQueryReturnValue.exchanges, ...baseQueryReturnValue.wallets]
        const rates: RatesEntity[] = []
        const items: PortfolioItemEntity[] = []
        const holdings: PortfolioHoldingEntity[] = []
        const portfolios = assets.map<PortfolioEntity>(asset => {
          const { id, name } = asset
          const res: any = {
            id,
            name
          }
          if ('wallet' in asset) {
            res.wallet = asset.wallet
          } else {
            res.exchange = asset.exchange
          }
          res.itemIds = asset.items.map((item: any) => {
            let image
            if ('wallet' in asset) {
              image = asset.wallet.image
            } else {
              image = asset.exchange.image
            }
            item.rates && rates.push(transformRates(item.id, item.rates))
            items.push({ ...item, parentId: asset.id, image, rates: undefined })
            holdings.push(...items.flatMap(item => item.holdings.map(holding => ({ ...holding, parentId: item.id }))))
            return item.id
          })
          asset.rates && rates.push(transformRates(id, asset.rates))
          return res
        })
        baseQueryReturnValue.rates && rates.push(transformRates('all', baseQueryReturnValue.rates))
        return {
          rates: ratesAdapter.setAll(ratesAdapter.getInitialState(), rates),
          portfolios: assetsAdapter.setAll(assetsAdapter.getInitialState(), portfolios),
          portfolioItems: assetsItemAdapter.setAll(assetsItemAdapter.getInitialState(), items),
          holdings: holdingsAdapter.setAll(holdingsAdapter.getInitialState(), holdings)
        }
      }
    }),
    syncPortfolioById: builder.mutation<{ jobId: string; state: PortfolioState }[], string>({
      query: (id: string) => ({
        url: `portfolios/sync/${id}`,
        method: 'GET'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
       try{
         const { data } = await queryFulfilled
         const jobs = data.map<Job>(({ jobId, state }) => ({ id: jobId, state, progress: 0 }))
         dispatch(upsertJobs(jobs))
       }catch (e) {

       }

      }
    }),
    syncPortfolioItemById: builder.mutation<{ jobId: string; state: PortfolioState }, string>({
      query: (id: string) => ({
        url: `portfolios/syncItem/${id}`,
        method: 'GET'
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try{
          const { data } = await queryFulfilled
          dispatch(upsertJob({ id: data.jobId, state: data.state, progress: 0 }))
        }catch{

        }

      }
    })
  })
})

export const { useGetUserPortfolioQuery, useSyncPortfolioByIdMutation, useSyncPortfolioItemByIdMutation } =
  portfoliosApi

// Can create a set of memoized selectors based on the location of this entity state
export const portfolioSelectors = assetsAdapter.getSelectors()
export const portfolioItemSelectors = assetsItemAdapter.getSelectors()
export const portfolioHoldingSelectors = holdingsAdapter.getSelectors()
export const portfolioRatesSelectors = ratesAdapter.getSelectors()

export const SelectPortfolioRatesById = (rates: EntityState<RatesEntity>, id: string) =>
  ratesAdapter.getSelectors().selectById(rates, id)
