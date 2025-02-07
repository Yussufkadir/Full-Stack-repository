import { useState } from 'react'
const Button = (props) =>{
    return(
        // eslint-disable-next-line react/prop-types
      <button onClick={props.handleClick}>{props.text}</button>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
  const setRandom = () =>{
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    console.log("random num is ", randomIndex)
    setSelected(randomIndex)
  }
  const voteForAnectode = () =>{
    const newVotes = [...vote]
    newVotes[selected] += 1
    setVote(newVotes)
  }
  const maxVotes = Math.max(...vote)
  const mostVoteIndex = vote.indexOf(maxVotes)
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={voteForAnectode} text="vote" />
      <Button handleClick={setRandom} text="next anectode"/>

      <h1>Anectode with the most votes</h1>
      <p>{anecdotes[mostVoteIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}
                   
export default App