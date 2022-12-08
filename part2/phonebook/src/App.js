import { useState } from 'react'

import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  const [newName, setNewName] = useState('');

  const [filter, setFilter] = useState(true);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  } 

  const existingName = persons.map(person => person.name);

  const addName = (e) => {
    e.preventDefault();
    const nameObj = {
      name: '',
      number: ''
    }
    if (existingName.includes(newName))
    {
      alert(`${newName} is already added to phonebook`)
    } else
    {
      nameObj.name = newName;
      setPersons(persons.concat(nameObj));
      setNewName('');
    }
  }

  // console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameChange}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person 
          personName={person.name}
          personNumber={person.number}
          key={person.name} 
          />
        )}
      </ul>

    </div>
  )
}

export default App
