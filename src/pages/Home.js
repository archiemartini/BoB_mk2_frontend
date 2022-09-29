import { Button, TextField } from "@mui/material"
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import MealCard from "../components/MealCard"
import mealData from '../data.json'
import { loadMeals } from "../store/meals"


export default function Home() {

  const [search, setSearch] = useState('')
  const state = useSelector(state => state.entities.meals.list)
  const dispatch = useDispatch()
  // const stableDispatch = useCallback(dispatch, [])

  const [showMeals, setShowMeals] = useState(false)
  // const [mealData, setMealData] = useState([])

  const mealList = state.map((meal) => {
    return (
      <MealCard key={meal.id} {...meal}/>
    )
  })

  const handleSubmit = () => {
    dispatch(loadMeals({search: search}))
  }


  return (
    <div className="Home">
      <div className="hero">
        <h1>Hello</h1>
        <TextField
          label="Search Meals"
          onChange={(e) => setSearch(e.target.value)}
         />
        <Button 
          label="Search Submit" 
          variant="outlined"
          onClick={handleSubmit}
        ><b>Search</b></Button>
        <Button 
          label="Show Meals"
          variant="outlined"
          onClick={() => setShowMeals(!showMeals)}
        >{showMeals ? <b>Hide Meals</b> : <b>Show Meals</b>}</Button>
      </div>
  {
    showMeals &&
    <div className="meal--list">
     {mealList}
    </div>
  }
    </div>
  )
}