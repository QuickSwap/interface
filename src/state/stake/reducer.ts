import { createReducer } from "@reduxjs/toolkit"
import { updateLairInfo, updateOldStakingInfo, updateStakingInfo, updateSyrupInfo, updateVeryOldStakingInfo, updateDualRewardsStakingInfo } from "./actions"
import { LairInfo, StakingInfo, SyrupInfo, DualStakingInfo } from "./hooks"

export interface StakeState {
  readonly dualRewardsStakingInfo: DualStakingInfo[]
  readonly stakingInfo: StakingInfo[]
  readonly syrupInfo: SyrupInfo[]
  readonly lairInfo: LairInfo | null
  readonly oldStakingInfo: StakingInfo[]
  readonly veryOldStakingInfo: StakingInfo[]
}

const initialState: StakeState = {
  dualRewardsStakingInfo: [],
  stakingInfo: [],
  syrupInfo: [],
  lairInfo: null,
  oldStakingInfo: [],
  veryOldStakingInfo: []
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateStakingInfo, (state, action) => {
      state.stakingInfo = action.payload
    })
    .addCase(updateDualRewardsStakingInfo, (state, action) => {
      state.dualRewardsStakingInfo = action.payload
    })
    .addCase(updateLairInfo, (state, action) => {
      state.lairInfo = action.payload
    })
    .addCase(updateSyrupInfo, (state, action) => {
      state.syrupInfo = action.payload
    })
    .addCase(updateOldStakingInfo, (state, action) => {
      state.oldStakingInfo = action.payload
    })
    .addCase(updateVeryOldStakingInfo, (state, action) => {
      state.veryOldStakingInfo = action.payload
    })
)