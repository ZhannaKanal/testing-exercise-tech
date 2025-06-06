import { configureStore } from '@reduxjs/toolkit'
import labelReducer from '@/features/labels/labelSlice'
import type { Label } from '@/features/labels/types'

const saveToLocalStorage = (labels: Label[]) => {
  try {
    localStorage.setItem('labels', JSON.stringify(labels))
  } catch (e) {
    console.error('Failed to save labels to localStorage:', e)
  }
}

export const store = configureStore({
  reducer: {
    labels: labelReducer,
  },
})

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const state = store.getState()
    saveToLocalStorage(state.labels)
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
