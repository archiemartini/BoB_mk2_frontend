import { createSlice } from "@reduxjs/toolkit";


// Slice
const slice = createSlice({
  name: 'meals',
  initialState: {list: [], loading: false, lastFetch: null},
  reducers: {
    mealsRequested: (meals, action) => {
      meals.loading = true;
    },

    mealsRecieved: (meals, action) => {
      meals.list = action.payload
      meals.loading = false
      meals.lastFetch = Date.now()
    },

    mealsRequestFailed: (meals, action) => {
      meals.loading = false
    }
  }
})

// Action creators

export const { mealsRequested, mealsRecieved, mealsRequestFailed} = slice.actions

// export the reducer

export default slice.reducer