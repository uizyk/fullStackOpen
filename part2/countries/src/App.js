import { useEffect, useState } from 'react'
import axios from 'axios'

import Country from './components/Country'



function App() {

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response =>{
      const countriesData = response.data
      setCountries(countriesData);
    })
  }, [])

  
  const [countries, setCountries] = useState([]);
  const [filter , setFilter] = useState('');

  const filterInputChange = (e) => {
    setFilter(e.target.value);
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
              <Country 
                filtered={filtered} 
                // area = {filtered.area}
                // flag={filtered.flags}
                // capital={filtered.capital}
                // languages={filtered.languages}
              />
          </ul>
        </div>
      )
  }


export default App;
