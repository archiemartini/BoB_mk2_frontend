import { Button } from "@mui/material"
import { useState } from "react"
import MealCard from "../components/MealCard"
import mealData from '../data.json'

export default function Home() {

  const [showMeals, setShowMeals] = useState(false)
  // const [mealData, setMealData] = useState([])

  const mealList = mealData.meals.map((meal) => {
    return (
      <MealCard {...meal}/>
    )
  })

  return (
    <div className="Home">
      <div className="hero">
        <h1>Hello</h1>
        <Button 
          label="Show Meals"
          variant="outlined"
          onClick={() => setShowMeals(!showMeals)}
        >Show Meals</Button>
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