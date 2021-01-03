import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (p) => {
  return (
  <p>{p.name} {p.amount}</p>
  )
}

const Content = (p) => {
  let n1 = p.parts[0].name
  let e1 = p.parts[0].exercises

  let n2 = p.parts[1].name
  let e2 = p.parts[1].exercises

  let n3 = p.parts[2].name
  let e3 = p.parts[2].exercises

  return (
    <div>
      <Part name={n1} amount={e1} />
      <Part name={n2} amount={e2} />
      <Part name={n3} amount={e3} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0;

  /*
  let total = props.parts.reduce((a, b) => {
    return a.exercises + b.exercises, 0
  })
  */

  //for loop way instead of something more effective...
  for(let i=0; i<props.parts.length; i++){
    sum += props.parts[i].exercises;
  }

  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);