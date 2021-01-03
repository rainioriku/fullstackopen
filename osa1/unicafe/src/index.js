import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState({
    total: 0,
    value: 0,
    positive: 0
  })

  const handleGood = () => {
    setGood(good+1)

    const newCLicks =  {
      ...allClicks,
      total: allClicks.total + 1,
      value: allClicks.value + 1,
      positive: allClicks.value +1
    }
    setAll(newCLicks)

  }
  const handleNeutral = () => {
    setNeutral(neutral+1)

    const newCLicks =  {
      ...allClicks,
      total: allClicks.total + 1,
      value: allClicks.value + 0
    }
    setAll(newCLicks)
  }
  const handleBad = () => {
    setBad(bad+1)

    const newCLicks =  {
      ...allClicks,
      total: allClicks.total + 1,
      value: allClicks.value - 1
    }
    setAll(newCLicks)
  }

  console.log("allclicks value: ", allClicks.total, " value: ", allClicks.value)
  return (
    <div>
      <Header text="give feedback"></Header>
      <Button handler={handleGood} text="good"></Button>
      <Button handler={handleNeutral} text="neutral"></Button>
      <Button handler={handleBad} text="bad"></Button>

      <Header text="statistics"></Header>
      <Statistic good={good}
                 neutral={neutral}
                 bad={bad}
                 allClicks={allClicks}
      >  
      </Statistic>

    </div>
  )
}

const Header = ({text}) => {
  return (
    <p>
      <b>
        {text}
      </b>
    </p>
  )
}

const Statistic = ({good, neutral, bad, allClicks}) => {
  if(allClicks.total === 0){
    return(
      <p>No feedback given</p>
    )
  }
  else{
    let average = allClicks.value / allClicks.total
    let positive = allClicks.positive / allClicks.total *100
    let total = allClicks.total

    return(
      <div>
        <table>
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="all" value={total}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="positive" value={positive}></StatisticLine>
        </table>
      </div>
    )
}}

const StatisticLine = ({text, value}) => {
  if(text === "positive"){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>
      {props.text}
    </button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)