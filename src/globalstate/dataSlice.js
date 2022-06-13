import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState = {

  tripData: {

    currentTrip: {},
    legacyTrips: []

  },
}

const dataSlice = createSlice({

  name: 'data',
  initialState,

  reducers: {
    // increment(state) {
    //     state = action.payload
    // },
    // decrement(state) {
    //     state.value--
    // },
    setAccountInfo(state, action) {
      state.info = action.payload
    },
  },
})

export const selectData = (state) => state.data
export const { setAccountInfo, setInterestedCategory } = dataSlice.actions
export default dataSlice.reducer
