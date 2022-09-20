export default function MealCard(props) {
  return (
    <div className="meal--card">
        <img src={props.image} alt={props.id} className="meal--card-image"></img>
        <h3>{props.title}</h3>
        <span className="meal--card-likes">{props.likes} likes</span>
        <span>{props.missedIngredientCount}/{props.missedIngredientCount + props.usedIngredientCount} ingredients</span>
    </div>
  )
}