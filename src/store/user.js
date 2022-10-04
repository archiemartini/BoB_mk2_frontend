import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";



// Slice

let lastId = 0

const slice = createSlice({
  name: 'users',
  initialState: {info: null, loading: false, lastFetch: null},
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name
      })
    },
    registerRequested: (user, action) => {
      user.loading = true;
    },
    registerReceived: (user, action) => {
      user.info = action.payload.data;
      user.loading = false;
      user.lastFetch = Date.now()
    },
    registerFailed: (user, action) => {
      user.loading = false
    }
  }
})

// Action creators
export const { 
  userAdded, 
  registerRequested, 
  registerReceived, 
  registerFailed
} = slice.actions

//Action command 
export const registerUser = (data) => (dispatch, getState) => {
  const url = '/user/register'

  return dispatch(apiCallBegan({
    url,
    method: 'post',
    data,
    onStart: registerRequested.type,
    onSuccess: registerReceived.type,
    onError: registerFailed.type
  }))

}

//export the reducer

export default slice.reducer