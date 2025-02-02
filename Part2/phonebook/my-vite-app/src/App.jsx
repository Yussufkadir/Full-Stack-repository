import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import personService from './services/persons'  

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchedT, setSearchT] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const namesToShow = searchedT
    ? persons.filter(person => person.name.toLowerCase().includes(searchedT.toLowerCase()))
    : persons

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }
    
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to list`)
      return
    }
  
    PersonService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchT(event.target.value)
  }

  return (
    <div>
      <h2>Filter</h2>
      <Filter searchedT={searchedT} handleSearchChange={handleSearchChange}/>
      
      <h2>Phonebook</h2>
      <PersonForm 
        name={newName} 
        nameHandler={handleNameChange}
        num={newNum} 
        numHandler={handleNumChange} 
        addName={addName}
      />
      
      <h2>Numbers</h2>
      <PersonList persons={namesToShow}/>
    </div>
  )
}

export default App