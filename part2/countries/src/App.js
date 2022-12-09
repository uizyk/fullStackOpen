import { useEffect, useState } from 'react'
import axios from 'axios'



function App() {
  
  const [countries, setCountries] = useState([]);
  const [filter , setFilter] = useState('');

  const filterInputChange = (e) => {
    setFilter(e.target.value);
  }

  const filtered = !filter
  ? countries
  : countries.filter((countries) => 
    countries.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {

    axios.get('https://restcountries.com/v3.1/all').then(response =>{
      const countriesData = response.data
      console.log(countriesData);
    })

  }, [])
    

  return (
    <div>
      find countries <input type='text' />
    </div>
  )

}

export default App;
