import { Label } from './types'
import {createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Label[] = []

const labelSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        addLabel: (state, action: PayloadAction<Label>) => {
            state.push(action.payload)
        },
        updateLabel: (state, action: PayloadAction<Label>) => {
            const index = state.findIndex(l=>l.id === action.payload.id)
            if (index !== -1) state[index] = action.payload
        },
        deleteLabel: (state, action: PayloadAction<string>) => {
            return state.filter(label => label.id !== action.payload)
        },
        setLabels: (state, action: PayloadAction<Label[]>) => {
            return action.payload
        },
    },
})

export const {addLabel, updateLabel, deleteLabel, setLabels} = labelSlice.actions
export default labelSlice.reducer
