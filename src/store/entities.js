import { combineReducers } from "redux";
import usersReducer from './user'
import mealsReducer from './meals'

export default combineReducers({
  meals: mealsReducer,
  user: usersReducer,
})