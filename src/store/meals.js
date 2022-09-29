import { createSlice } from "@reduxjs/toolkit";
import moment from "moment"
import { apiCallBegan } from "./api";


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

//holdall function for above actions
const url = '/meals'
export const loadMeals = (data) => (dispatch, getState) => {
  const { lastFetch } = getState().entities.meals;

  // const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  // if (diffInMinutes < 10) return;

  return dispatch(apiCallBegan({
    url,
    method: 'post',
    data,
    onStart: mealsRequested.type,
    onSuccess: mealsRecieved.type,
    onError: mealsRequestFailed.type
  }))
}

// Command actions
// export const addBug = bug => apiCallBegan({
//   url,
//   method: "post",
//   data: bug,
//   onSuccess: bugAdded.type
// })

// export the reducer

export default slice.reducer