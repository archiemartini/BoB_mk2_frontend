export default function SelectedMeal(props) {

  console.log("Selected meal", props)
  return (
    <div>
      <img src={props.image} alt={props.id}></img>
      <div>{props.title}</div>
      <div>{props.aggregateLikes}</div>
      <div>{props.creditsText}</div>
      <div>{props.sourceName}</div>
      <div>{props.sourceUrl}</div>

    </div>
  )
}