import { useEffect, useState } from 'react'
import axios from 'axios'

import Country from './components/Country'



function App() {

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response =>{
      const countriesData = response.data
      setCountries(countriesData);
      console.log(countriesData);
    })
  }, [])

  
  const [countries, setCountries] = useState([]);
  const [filter , setFilter] = useState('');

  const filterInputChange = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  }

  const filtered = !filter
  ? countries
  : countries.filter((country) => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

    

  return (
    <div>
      find countries <input type='text' onChange={filterInputChange}/>
      <ul>
      {filtered.map(country =>
        <Country countryName={country.name.common} key={country.name.official}/>
      )}
      </ul>
    </div>
  )

}

export default App;
