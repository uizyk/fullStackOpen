import { useEffect, useState } from 'react'

import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Communication from './components/Communication'

const App = () => {

  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter , setFilter] = useState('');

  const nameInputChange = (e) => {
    setNewName(e.target.value);
  } 

  const numberInputChange = (e) => {
    setNewNumber(e.target.value);
  } 

  const filterInputChange = (e) => {
    setFilter(e.target.value);
  }

  const filtered = !filter
    ? persons
    : persons.filter((person) => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  
  const addName = (e) => {
    const existingName = persons.map(person => person.name);
    e.preventDefault();
    const nameObj = {
      name: '',
      number: ''
    }
    if (existingName.includes(newName))
    {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        Communication
          .update(nameObj.name, nameObj)
          .then(response => {
            setPersons(response.data)
          })
      }
    } else
    {
      nameObj.name = newName;
      nameObj.number = newNumber;
      setPersons(persons.concat(nameObj));
      setNewName('');
      setNewNumber('');
      Communication
        .create(nameObj)
    }
  }

  // fetch and set data from json
  useEffect(() => {

    Communication
      .getAll()
      .then(response => {
        setPersons(response.data);
    })

  }, []);
  
  // Delete person

    const deletePerson = (person) => {
      if (window.confirm(`Do you really want to delete ${person.name}?`)){
        Communication
          .deletePerson(person.id)
          .then(response => {
            Communication.getAll().then(response => {
              setPersons(response.data)
            })
            })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter}
        filterInput={filterInputChange}
      />
      <PersonForm 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        numberInputChange={numberInputChange}
        nameInputChange={nameInputChange}
      />
      <h2>Numbers</h2>
      <ul>
        {filtered.map(person =>
          <Person 
            personName={person.name}
            personNumber={person.number}
            deletePerson={() => deletePerson(person)}
            key={person.name} 
          />
        )}
      </ul>
    </div>
  )
}

export default App
