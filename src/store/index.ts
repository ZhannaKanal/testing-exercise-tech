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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(store => next => action => {
      const result = next(action)
      const state = store.getState()
      if (typeof window !== 'undefined') {
        saveToLocalStorage(state.labels)
      }
      return result
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
