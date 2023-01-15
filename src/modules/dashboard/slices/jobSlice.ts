import {
  combineReducers,
  createAction,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction
} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AppState } from '../../../store/store'

export type Job = { id: string; state: PortfolioState; progress: number }
export type PortfolioState = number | 'completed' | 'waiting' | 'active' | 'delayed' | 'failed' | 'paused'
export const jobAdapter = createEntityAdapter<Job>({
  selectId: job => job.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})
// Type for our state
export interface JobState {
  jobs: EntityState<Job>
}

// Initial state
const initialState: JobState = {
  jobs: { ids: [], entities: {} }
}

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,

  reducers: {
    upsertJob(state, action: PayloadAction<Job>) {
      jobAdapter.upsertOne(state.jobs, action.payload)
    },
    addJob(state, action: PayloadAction<Job>) {
      jobAdapter.addOne(state.jobs, action.payload)
    },
    addJobs(state, action: PayloadAction<Job[]>) {
      jobAdapter.addMany(state.jobs, action.payload)
    },
    upsertJobs(state, action: PayloadAction<Job[]>) {
      jobAdapter.upsertMany(state.jobs, action.payload)
    },
    updateJob(state, action: PayloadAction<{ id: string; state: PortfolioState; progress?: number }>) {
      jobAdapter.updateOne(state.jobs, {
        id: action.payload.id,
        changes: { state: action.payload.state, progress: action.payload.progress }
      })
    },
    removeJob(state, action: PayloadAction<string>) {
      jobAdapter.removeOne(state.jobs, action.payload)
    }
  },

  extraReducers: builder => {
    builder.addCase(createAction<AppState>(HYDRATE), (state, action) => {
      return state
    })
  }
})

export const { updateJob, upsertJob, upsertJobs, addJob, addJobs, removeJob } = jobSlice.actions
export const { selectById, selectIds, selectAll, selectTotal, selectEntities } = jobAdapter.getSelectors()

export const selectJobById = (state: AppState, id: string) => selectById(state.jobs.jobs, id)

export default persistReducer({ key: jobSlice.name, storage }, jobSlice.reducer)
