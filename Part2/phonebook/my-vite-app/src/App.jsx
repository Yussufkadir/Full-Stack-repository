import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([{name: "Arto Hellas", number: '12-00'}]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchedT, setSearchT] = useState('')

  useEffect(() => {
    axios 
        .get('http://localhost:3001/persons')
        .then(response =>{
          setPersons(response.data)
        })
  }, [])

  const namesToShow = searchedT
  ? persons.filter(person => person.name.includes(searchedT))
  : persons

  const addName = (event) =>{
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }
    if(persons.some(person => person.name == newName)){
      alert(`${newName} is already added to list`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')
    console.log('button clicked', event.target)
    console.log(persons)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchT(event.target.value)
  }

  return (
    <div>
      <h2>Filter</h2>
      <form>
        <Filter searchedT={searchedT} handleSearchChange={handleSearchChange}/>
      </form>
      <h2>Phonebook</h2>
      <PersonForm name={newName} nameHandler={setNewName} num={newNum} numHandler={setNewNum} addName={addName}/>
      <h2>Numbers</h2>
      <PersonList persons={namesToShow}/>
    </div>
  )
}

export default App