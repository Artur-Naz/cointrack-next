import {createEntityAdapter, createSelector, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "../../../../store/store";
import {DashboardState} from "../dashboardSlice";

export type Job = { id: string;  jobId: string, state: PortfolioState }
export type PortfolioState = number | 'wait' | 'active' | 'complete' | 'fail'
export const jobAdapter = createEntityAdapter<Job>({
  selectId: job => job.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)

})


export const jobReducer: Record<string, (state: DashboardState, action: PayloadAction<any>) => void> = {
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
}
export const selectJobById = (state: AppState, id: string) => jobAdapter.getSelectors().selectById(state.dashboard.jobs, id)
export const selectJobByJobId = (state: AppState, jobId: string) => createSelector(
  [(state: AppState) => state.dashboard.jobs, () => jobId],
  (state) => jobAdapter.getSelectors().selectAll(state).find(job => job.jobId ===jobId)
);
