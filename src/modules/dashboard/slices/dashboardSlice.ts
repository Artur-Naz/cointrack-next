import { createAction, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AppState } from '../../../store/store'
import { portfoliosApi } from '../api/portfoliosApi'

export type Job = { id: string; state: PortfolioState }
export type PortfolioState = number | 'wait' | 'active' | 'complete' | 'fail'
export const jobAdapter = createEntityAdapter<Job>({
  selectId: job => job.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

// Type for our state
export interface DashboardState {
  dashboardMenu: Record<string, boolean>
  selectedPortfolio: string | null
  selectedTab: number
  jobs: EntityState<Job>
}

// Initial state
const initialState: DashboardState = {
  dashboardMenu: {},
  selectedPortfolio: null,
  selectedTab: 0,
  jobs: { ids: [], entities: {} }
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,

  reducers: {
    toggle(state, action: PayloadAction<string>) {
      state.dashboardMenu[action.payload] = !state.dashboardMenu[action.payload]
    },
    setDashboardTab(state, { payload }: PayloadAction<number>) {
      state.selectedTab = payload
    },
    setSelectedPortfolio(state, action: PayloadAction<string>) {
      state.selectedPortfolio = action.payload
    },
    addJob(state, action: PayloadAction<Job>) {
      jobAdapter.addOne(state.jobs, action.payload)
    },
    addJobs(state, action: PayloadAction<Job[]>) {
      jobAdapter.addMany(state.jobs, action.payload)
    },
    updateJob(state, action: PayloadAction<{ id: string; state: PortfolioState }>) {
      jobAdapter.updateOne(state.jobs, { id: action.payload.id, changes: { state: action.payload.state } })
    },
    removeJob(state, action: PayloadAction<string>) {
      jobAdapter.removeOne(state.jobs, action.payload)
    }
  },

  extraReducers: builder => {
    builder
      .addCase(createAction<AppState>(HYDRATE), (state, action) => {
        return state
      })
      .addMatcher(
        portfoliosApi.endpoints.getUserPortfolio.matchFulfilled, //.matchFulfilled,
        (state, { payload: { portfolios } }) => {
          const dashboardMenu = portfolios.ids.reduce<Record<string, boolean>>((acc, id) => {
            acc[id] = state.dashboardMenu[id] ?? false

            return acc
          }, {})

          return { ...state, dashboardMenu }
        }
      )
  }
})

export const { toggle, setDashboardTab, setSelectedPortfolio, updateJob, addJob, addJobs } = dashboardSlice.actions

export const selectCurrentTab = (state: AppState) => state.dashboard.selectedTab
export const selectSelectedPortfolio = (state: AppState) => state.dashboard.selectedPortfolio

export const selectJob = (state: AppState, id: string) => jobAdapter.getSelectors().selectById(state.dashboard.jobs, id)

export default persistReducer({ key: dashboardSlice.name, storage }, dashboardSlice.reducer)
