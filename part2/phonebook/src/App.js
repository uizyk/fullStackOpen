import { useEffect, useState } from 'react'

import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Communication from './components/Communication'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter , setFilter] = useState('');

  const [message, setMessage] = useState(null);

  const nameInputChange = (e) => {
    setNewName(e.target.value);
  } 

  const numberInputChange = (e) => {
    setNewNumber(e.target.value);
  } 

  const filterInputChange = (e) => {
    setFilter(e.target.value);
  }

  const notification = (addedName) => {
    setMessage({message:`Added ${addedName}`, type:'notification'});
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }


  const filtered = !filter
    ? Array.from(persons)
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

        let person = persons.find(person => person.name === newName);
        let personId = person.id;
        nameObj.name = newName;
        nameObj.number = newNumber;

        Communication
        .update(personId, nameObj)
        .then((response) => {
          Communication
            .getAll()
            .then(response => {
              setPersons(response.data)
              notification(nameObj.name);
            })
        })
        .catch(error => {
          setMessage({message:`Information of ${nameObj.name} has already been removed from the server`, type: 'error'})
          Communication
            .getAll()
            .then(response => {
              setPersons(response.data);
            })
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } 
    else
    {
      nameObj.name = newName;
      nameObj.number = newNumber;
      setPersons(persons.concat(nameObj));
      setNewName('');
      setNewNumber('');
      Communication
        .create(nameObj)
        .then(response => {
          Communication.getAll()
          .then(response => {
            setPersons(response.data);
          })
        });
      notification(nameObj.name);
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
        .then((response) => {
          Communication.getAll().then(response => {
            setPersons(response.data)
          })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
