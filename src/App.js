import { useEffect, useState } from "react"
import api from './api/base'

function App() {

  const [mealData, setMealData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('./meals')
        setMealData(response.data)
        console.log("mealData", response.data)
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
    }
    fetchData()
  }, [])

  const mealList = mealData.map((meal) => {
    return (
      <div>
        <img src={meal.image}></img>
        <span>{meal.likes} likes</span>
      </div>
    )
  })

  return (
    <div className="App">
      <h1>Hello</h1>
      {mealList}
    </div>
  );
}

export default App;
