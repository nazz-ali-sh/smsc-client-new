import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { UserType } from '@/views/UserManagement/types'

interface UserState {
  users: UserType[]
  tenderId: string | number
}

const initialState: UserState = {
  users: [],
  tenderId: ''
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.users = state.users.map(user => (user.id === action.payload.id ? action.payload : user))
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    setTenderId: (state, action: PayloadAction<string | number>) => {
      state.tenderId = action.payload
    },
    toggleUserStatus: (state, action: PayloadAction<number>) => {
      const user = state.users.find(user => user.id === action.payload)

      if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active'
      }
    }
  }
})

export const { setTenderId, setUsers, addUser, updateUser, deleteUser, toggleUserStatus } = userSlice.actions
export default userSlice.reducer
