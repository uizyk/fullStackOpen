import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Button = (props) => {
  return(
    <button onClick = {props.onClick}>{props.rating}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {

  let total = good + neutral + bad

    if(total == 0){
      return(
        <div>
          No feedback given
        </div>
      )
    } else {
      return(
        <div>
          <table>
            <tbody>
              <StatisticLine text="good" value ={good} />
              <StatisticLine text="neutral" value ={neutral} />
              <StatisticLine text="bad" value ={bad} />
              <StatisticLine text="all" value ={total} />
              <StatisticLine text='average' value={(good - bad) / total}/>
              <StatisticLine text='positive' value={(good / total * 100) + '%'}/>
            </tbody>
          </table>
        </div>
      )
    }
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodPlusOne = () => {
      setGood(good + 1)
  }

  return (
    <div>
      <Header title='give feedback'/>
      <Button rating='good' onClick={goodPlusOne}/>
      <Button rating='neutral' onClick={() => setNeutral(neutral + 1)}/>
      <Button rating='bad' onClick={() => setBad(bad + 1)}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App