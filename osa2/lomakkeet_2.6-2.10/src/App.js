import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("response: ", response.data)
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const copy = persons.map(elem => elem)
    const foundName = copy.find(person => person.name === newName)
    const foundNumber = copy.find(person => person.number === newNumber)

    if(foundName){
      window.alert(`${newName} is already added to phonebook`)
    }
    if(foundNumber){
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    console.group(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.group(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.group(event.target.value)
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter}
              handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
                  addPerson={addPerson}/>
      <Numbers persons={persons} filter={newFilter}/>
    </div>
  )

}

const Filter = (props) => {
  let {newFilter, handleFilterChange} = props
  return (
    <div>
      filter shown with <input value={newFilter}
                               onChange={handleFilterChange}/>    
    </div>
  )
}

const PersonForm = (props) => {
  let {newName, handleNameChange,
       newNumber, handleNumberChange, addPerson} = props
  return (
    <form>
        <div>
          name: <input  value={newName}
                        onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber}
                         onChange={handleNumberChange}/>
        </div>


        <div>
          <button onClick={addPerson}
                  type="submit">add</button>
        </div>
      </form>
  )
}

const Numbers = (props) => {
  let persons = props.persons
  let filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <div>
    <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <p key={person.name}>
            {person.name} {person.number}
        </p>
      )}
  </div>
  )
}

export default App