import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { BranchType } from '@/views/BranchManagement/types'

interface BranchState {
  branches: BranchType[]
}

const initialState: BranchState = {
  branches: []
}

const branchSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    setBranches: (state, action: PayloadAction<BranchType[]>) => {
      state.branches = action.payload
    },
    addBranch: (state, action: PayloadAction<BranchType>) => {
      state.branches.push(action.payload)
    },
    updateBranch: (state, action: PayloadAction<BranchType>) => {
      const index = state.branches.findIndex(b => b.id === action.payload.id)

      if (index !== -1) state.branches[index] = action.payload
    },
    deleteBranch: (state, action: PayloadAction<number>) => {
      state.branches = state.branches.filter(b => b.id !== action.payload)
    },
    toggleBranchStatus: (state, action: PayloadAction<number>) => {
      const branch = state.branches.find(b => b.id === action.payload)

      if (branch) {
        branch.status = branch.status === 'active' ? 'inactive' : 'active'
      }
    }
  }
})

export const { setBranches, addBranch, updateBranch, deleteBranch, toggleBranchStatus } = branchSlice.actions
export default branchSlice.reducer
