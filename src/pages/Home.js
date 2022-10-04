import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import MealCard from "../components/MealCard"
import SelectedMeal from "../components/SelectedMeal"
import { searchMeals, selectMeal } from "../store/meals"
import { Button, CircularProgress } from "@mui/material"
import CustomTextField from "../components/CustomMUI/CustomTextField"

export default function Home() {

  const [search, setSearch] = useState('')
  const [showSelected, setShowSelected] = useState(false)
  const [showMeals, setShowMeals] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const mealData = useSelector(state => state.entities.meals.list)
  const selectedMeal = useSelector(state => state.entities.meals.selectedMeal)
  const isMealsLoading = useSelector(state => state.entities.meals.loading)
  const isSelectedLoading = useSelector(state => state.entities.meals.loading)
  
  const dispatch = useDispatch()
  const ref = useRef(null);


  const handleSearchSubmit = async () => {
    setShowMeals(true)
    await dispatch(searchMeals({search: search}))
  }

  const handleSelectionSubmit = async (mealId) => {
    setSelectedId(mealId)
    setShowSelected(true)
    await dispatch(selectMeal({id: mealId}))
    setTimeout(() => ref.current?.scrollIntoView({behavior: 'smooth'}), 1)
  }

  const mealList = mealData.map((meal) => {
    return (
      <MealCard key={meal.id} {...meal} handleSelectionSubmit={handleSelectionSubmit}/>
    )
  })

  const selectedMealWithIngredients = () => {
    const missedIngredients = mealData.filter((meal) => meal.id !== selectedId)[0].missedIngredients
    const usedIngredients = mealData.filter((meal) => meal.id !== selectedId)[0].usedIngredients

    return {...selectedMeal.info, missedIngredients, usedIngredients}
  }

  return (
    <div className="Home">
      <div className="hero">
        <h1>Hello</h1>
        <CustomTextField
          label="Search Meals"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
         />
        <div className="search-button">
          <Button 
            label="Search Submit" 
            variant="outlined"
            onClick={handleSearchSubmit}
          ><b>Search</b></Button>
        </div>
        {/* <CircularProgress /> */}
        </div>          
        <div className="meal--list">
        {showMeals && isMealsLoading ? <CircularProgress className="center"/> : mealList}
        </div>
      {showSelected && 
      <SelectedMeal {...selectedMealWithIngredients()} useRef={ref} key={selectMeal.id} />
      }
    </div>
  )
}