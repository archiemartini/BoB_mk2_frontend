export default function SelectedMeal(props) {

  console.log("selected Meal", props)

  const instructions = () => {
    if(props.analyzedInstructions[0]) {
      return props.analyzedInstructions[0].steps.map((step) => {
        return (
          <li>{step.step}</li>
        )
      })
    } else {
      return
    }
  }

  const ingredients = () => {
    return props.extendedIngredients.map((ingredient) => {
      return (
        <li>{ingredient.name[0].toUpperCase() + ingredient.name.slice(1)}</li>
      )
    })
  }

  return (
    <div className="selected-meal--card" ref={props.useRef}>
      <img src={props.image} alt={props.id} className="selected-meal--image"></img>
      <div><b>{props.title}</b></div>
      <div className="gray">{props.aggregateLikes} likes</div>
      <div className="gray">
        Source: <a className="selected-source" href={props.sourceUrl}>{props.sourceName}</a>
      </div>
      <ol>
        {instructions()}
      </ol>
      <ul>
        {ingredients()}
      </ul>
    </div>
  )
}