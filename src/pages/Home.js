import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import MealCard from "../components/MealCard"
import SelectedMeal from "../components/SelectedMeal"
import { loadMeals, selectMeal } from "../store/meals"
import { Button } from "@mui/material"
import CustomTextField from "../components/CustomMUI/CustomTextField"
import CustomButton from "../components/CustomMUI/CustomButton"


export default function Home() {

  const [search, setSearch] = useState('')
  const [showSelected, setShowSelected] = useState(false)
  const [showMeals, setShowMeals] = useState(false)

  const mealData = useSelector(state => state.entities.meals.list)
  const selectedMeal = useSelector(state => state.entities.meals.selectedMeal)
  
  const dispatch = useDispatch()
  const ref = useRef(null);


  const handleSearchSubmit = async () => {
    await dispatch(loadMeals({search: search}))
    setShowMeals(true)
  }

  const handleSelectionSubmit = async (mealId) => {
    console.log(selectedMeal)
    await dispatch(selectMeal({id: mealId}))
    setShowSelected(true)
    setTimeout(() => ref.current?.scrollIntoView({behavior: 'smooth'}), 200)
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
        <CustomTextField
          label="Search Meals"
          onChange={(e) => setSearch(e.target.value)}
         />
        <div className="search-button">
          <Button 
            label="Search Submit" 
            variant="outlined"
            onClick={handleSearchSubmit}
          ><b>Search</b></Button>
        </div>
      </div>
        {
          showMeals &&
          <div className="meal--list">
          {mealList}
          </div>
        }
      {showSelected && <SelectedMeal {...selectedMeal.info} useRef={ref} />
}
    </div>
  )
}