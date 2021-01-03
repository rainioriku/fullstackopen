import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const App = (props) => {
  //indexing for anecdote array
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const buttonText="next anecdote"
  const textVoteButton = "vote"

  const handleClick = () => {
    console.log("points arr: ", points)
    let select = getRandomNumber(anecdotes.length)
    setSelected(select)
  }

  const handleVote = () => {
    const copy = [...points]
    console.log("selected: ", selected);
    copy[selected] += 1

    setPoints(copy);
  }

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  return (
    <div>
      <Header text={"Anecdote of the day"}></Header>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      <Button handler={handleVote}
              text={textVoteButton}></Button>
      <Button handler={handleClick}
              text={buttonText}>
      </Button>

      <MostVotes points={points}></MostVotes>
    </div>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const MostVotes = ({points}) => {
  let highest = Math.max(...points)
  let highestIndex = points.indexOf(highest)
  let anecdote = anecdotes[highestIndex]

  if(highest <= 0){
    return(
      <div>
        <Header text={"Anecdote with most votes"}></Header>
        <p>no votes yet!</p>
      </div>
    )
  }
  else{
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
        <p>has {highest} votes</p>
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)