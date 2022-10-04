import { createSlice } from "@reduxjs/toolkit";
import moment from "moment"
import { apiCallBegan } from "./api";


// Slice
const slice = createSlice({
  name: 'meals',
  initialState: {list: [], loading: false, lastFetch: null, selectedMeal: { loading: false, info: null}},
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
    },

    selectedMealRequested: (meals, action) => {
      meals.selectedMeal.loading = true;
    },
    selectedMealReceived: (meals, action) => {
      console.log("selectedmealReceived", action.payload)
      meals.selectedMeal.info = action.payload
      meals.selectedMeal.loading = false;
      meals.selectedMeal.lastFetch = Date.now()
    },
    selectedMealRequestFailed: (meals, action) => {
      meals.selectedMeal.loading = false
    },
  }
})

// Action creators

export const { 
   mealsRequested,
   mealsRecieved, 
   mealsRequestFailed, 
   selectedMealReceived, 
   selectedMealRequested, 
   selectedMealRequestFailed
} = slice.actions

//holdall function for above actions
export const searchMeals = (data) => (dispatch, getState) => {
  const url = '/meals'

  // const { lastFetch } = getState().entities.meals;

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

export const selectMeal = (data) => (dispatch, getState) => {
  const url = `/selectmeal?id=${data.id}`

  return dispatch(apiCallBegan({
    url,
    data,
    onStart: selectedMealRequested.type,
    onSuccess: selectedMealReceived.type,
    onError: selectedMealRequestFailed.type
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