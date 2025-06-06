import { configureStore } from '@reduxjs/toolkit'
import labelReducer from '@/features/labels/labelSlice'

export const store = configureStore({
  reducer: {
    labels: labelReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch