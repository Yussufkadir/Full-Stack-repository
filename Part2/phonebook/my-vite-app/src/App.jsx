import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import PersonService from './services/PersonService'  

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
      
      const existingPerson = persons.find(p => p.name === newName)
      
      if (existingPerson) {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              PersonService
                  .update(existingPerson.id, nameObject)
                  .then(returnedPerson => {
                      setPersons(persons.map(person => 
                          person.id === existingPerson.id ? returnedPerson : person
                      ))
                      setNewName('')
                      setNewNum('')
                  })
                  .catch(error => {
                      alert(`Person '${newName}' was already deleted from server`)
                      setPersons(persons.filter(p => p.id !== existingPerson.id))
                  })
          }
      } else {
          PersonService
              .create(nameObject)
              .then(returnedPerson => {
                  setPersons(persons.concat(returnedPerson))
                  setNewName('')
                  setNewNum('')
              })
      }
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
        PersonService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                alert(`Person '${name}' was already deleted from server`)
                setPersons(persons.filter(n => n.id !== id))
            })
    }
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
      <PersonList persons={namesToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App