import { useState } from 'react'

import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  // const [filter, setFilter] = useState(true);

  const nameInputChange = (e) => {
    setNewName(e.target.value);
  } 

  const numberInputChange = (e) => {
    setNewNumber(e.target.value);
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
      alert(`${newName} is already added to phonebook`);
    } else
    {
      nameObj.name = newName;
      nameObj.number = newNumber;
      setPersons(persons.concat(nameObj));
      setNewName('');
      setNewNumber('');
    }
  }

  // console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={nameInputChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberInputChange}/>
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
