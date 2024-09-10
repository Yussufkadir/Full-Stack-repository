import { useState } from 'react'
const Display = (props) => <h1>{props.value}</h1>
const DisplayStats = (props) => <div>{props.name} {props.val}</div>
const Button = (props) =>{
    return(
    <button onClick={props.handleClick}>
        {props.text}
    </button>
    )
}
const StatisticLine = (props) => {
    const {text, value} = props
    return(
        <tr>
        <td>{text} {value}</td>
        </tr>
    )
}
const Statistics = (props) => {
    const {good, neutral, bad} = props
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = good / total

    if(total==0){
        return(
            <p>No feedback given</p>
        )
    }
    return(
        <div>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="total" value ={total} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
        </div>
    )
  }
const App = () => {
  // save clicks of each button to its own state
  const feedback = 'give feedback'
  const stats = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue1 =>{
    console.log('good', newValue1)
    setGood(newValue1)
  }
  const setToNeutral = newValue2 =>{
    console.log('neutral', newValue2)
    setNeutral(newValue2)
  }
  const setToBad = newValue3 =>{
    console.log('bad', newValue3)
    setBad(newValue3)
  }
  return (
    <div>
      <Display value={feedback}/>
      <Button handleClick={() => setToGood(good + 1)} text='good'/>
      <Button handleClick={() => setToNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setToBad(bad+ 1)} text='bad'/>
      <Display value={stats}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App