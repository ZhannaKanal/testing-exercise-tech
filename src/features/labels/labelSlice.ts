import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Label } from './types'

const loadFromLocalStorage = (): Label[] => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem('labels')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }
  return []
}

const initialState: Label[] = loadFromLocalStorage()

const labelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    addLabel(state, action: PayloadAction<Label>) {
      state.push(action.payload)
    },
    deleteLabel(state, action: PayloadAction<string>) {
      return state.filter(label => label.id !== action.payload)
    },
  },
})

export const { addLabel, deleteLabel } = labelSlice.actions
export default labelSlice.reducer

