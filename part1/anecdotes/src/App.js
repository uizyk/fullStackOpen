import { useState } from 'react'

const Title = (props) => <h1>{props.title}</h1>

const Button = (props) => {
  return(
  <button onClick={props.onClick}>{props.text}</button>
  )
}


const App = () => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length))
    return(
      selected
    )
  }

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const vote = () => {

    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);

    }


  return (
    <>
      <Title title='Anecdote of the day'/>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <Button onClick={vote} text='vote' />
      <Button onClick={nextAnecdote} text='next anecdote' />
      <Title title='Anecdote with most votes'/>
      <div>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
        <br />
        has {Math.max(...votes)} votes
      </div>

    </>
    
  )
}

export default App