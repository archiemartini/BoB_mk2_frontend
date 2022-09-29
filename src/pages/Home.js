import { Button, TextField } from "@mui/material"
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import MealCard from "../components/MealCard"
import SelectedMeal from "../components/SelectedMeal"
import mealData from '../data.json'
import { loadMeals, selectMeal } from "../store/meals"


export default function Home() {

  const [search, setSearch] = useState('')
  const [showSelected, setShowSelected] = useState(false)
  const mealData = useSelector(state => state.entities.meals.list)
  const selectedMeal = useSelector(state => state.entities.meals.selectedMeal)
  const dispatch = useDispatch()
  // const stableDispatch = useCallback(dispatch, [])

  const [showMeals, setShowMeals] = useState(false)
  // const [mealData, setMealData] = useState([])

  const handleSearchSubmit = () => {
    dispatch(loadMeals({search: search}))
  }

  const handleSelectionSubmit = async (mealId) => {
    await dispatch(selectMeal({id: mealId}))
    setShowSelected(true)
  }

  const mealList = mealData.map((meal) => {
    return (
      <MealCard key={meal.id} {...meal} handleSelectionSubmit={handleSelectionSubmit}/>
    )
  })


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
          onClick={handleSearchSubmit}
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
      {showSelected && <SelectedMeal {...selectedMeal.info} />
}
    </div>
  )
}