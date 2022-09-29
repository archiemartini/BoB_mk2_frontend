import { combineReducers } from "redux";
import bugsReducer from './bugs'
import projectsReducer from './projects'
import usersReducer from './users'
import mealsReducer from './meals'

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
  meals: mealsReducer
})