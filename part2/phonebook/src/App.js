import { useState } from 'react'

const Person = ({person}) => {
  return(
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    console.log(e.target);
    setNewName(e.target.value);
  } 

  const addPerson = (e) => {
    e.preventDefault()
    setPersons(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={addName}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person person={person.name} />
        )}
      </ul>

      ...
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
