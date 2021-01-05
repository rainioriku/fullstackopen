import React, { useEffect, useState } from 'react'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("neutral")

  //GET USERS
  useEffect(() => {
    personService
      .getUsers()
        .then(persons => {
          setPersons(persons)
        })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const copy = persons.map(elem => elem)
    const foundPerson = copy.find(person => person.name === newName)
    const foundNumber = copy.find(person => person.number === newNumber)

    //Check if person with given name or number already exists
    if(foundPerson && foundPerson.number !== personObject.number){
      const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(answer){
        personService
        .updateUser(personObject, foundPerson.id)
        .then(response => {
          console.log("response : ", response)
          const copy = [...persons]
          const index = persons.indexOf(foundPerson)
          copy[index].number = newNumber

          setPersons(copy)

          //reset input fields
          setNewName("")
          setNewNumber("")

          //notifcation
          setMessage(`Changed number of ${personObject.name}`)
          setMessageType("success")
          setTimeout(() => {
            setMessageType("neutral")
          }, 3000)
          console.log("message: ", message)
        })
        .catch(error => {
          console.log("catched error: ", error)
          setPersons(persons.filter(person => person.id !== foundPerson.id))

          //change notification
          setMessage(`Information of ${personObject.name} has already been removed from server`)
          setMessageType("failure")

          setTimeout(() => {
            setMessageType("neutral")
          }, 3000)
          //reset input fields
          setNewName("")
          setNewNumber("")
        })
      }
      else{
        //reset input fields
        setNewName("")
        setNewNumber("")
      }
      
    }
    if(foundNumber){
      window.alert(`${newNumber} is already added to phonebook`)
    }
    if(!(foundPerson)){
      //UPDATE STATE ONLY IF Promise resolves!
      personService
        .addUser(personObject)
          .then(addedPerson => {
            //concat creates copy!
            setPersons(persons.concat(addedPerson))
            
            //reset input fields
            setNewName("")
            setNewNumber("")

            //notifcation
            setMessage(`Added ${personObject.name}`)
            setMessageType("success")
            setTimeout(() => {
              setMessageType("neutral")
            }, 3000)
            console.log("message: ", message)
          })
    }
  }

  const deletePerson = (personName) => {
    if(window.confirm(`Delete ${personName} ?`)){
      let personFound = persons.find(person => person.name === personName)
        if(personFound){
          const newArray = persons.filter(person => {
            return person !== personFound
          })
          console.log("new arr: ", newArray)
          personService
            .deleteUser(personFound.id)
            .then(response => {
              //notifcation
              setMessage(`Deleted ${personFound.name}`)
              setMessageType("success")
              setTimeout(() => {
                setMessageType("neutral")
              }, 3000)
              console.log("message: ", message)
              console.log(response)
            }
            )
          setPersons(newArray)
        }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}
                    messageType={messageType} />
      <Filter newFilter={newFilter}
              handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
                  addPerson={addPerson}/>
      <Numbers persons={persons} onDeleteButton={deletePerson} filter={newFilter}/>
    </div>
  )

}

const Notification = ({message, messageType}) => {
  if(message === null){
    return null
  }

  console.log("Notification component called with message: ", message)
  console.log("Message type is: ", messageType)

  if(messageType === "success"){
    return (
      <div className="successNotification">
        {message}
      </div>
    )
  }
  if(messageType === "failure"){
    return (
      <div className="failureNotification">
        {message}
      </div>
    )
  }
  if(messageType === "neutral"){
    return (
      <div></div>
    )
  }
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
  const persons = props.persons
  let filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase()))

  return (
    <div>
    <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person =>
        <p key={person.name}>
            <p>{person.name} {person.number}
              <button onClick={() => props.onDeleteButton(person.name)}>delete</button>
            </p>
            
        </p>
      )}
      </div>
      
  </div>
  )
}

export default App