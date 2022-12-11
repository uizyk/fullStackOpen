import React from 'react';
import Languages from './Languages';

const Country = ({filtered}) => {
    if(filtered.length > 11){
        if(filtered.length === 250){
            return(
                <p>Type above to find a country</p>
            )
        // }

        }
        else {
            return(
                <p>Too many matches, specify another filter</p>
            )
        }
            
    } 
    else if(filtered.length === 1){
        return(
            filtered.map(country =>   
                <div key={country.name.official}>         
                    <h2>{country.name.common}</h2>
                    <p>capital {country.capital}</p>
                    <p>area {country.area}</p>
                    <Languages languages={country.languages} />
                    <br />
                    <img src={`${country.flags.png}`}/>
                </div>
            )
        )
    }
    else if(filtered.length === 0){
        return(
            <p>No results</p>
        )
    }
    else {
        return(
            filtered.map(country =>            
                <p key={country.name.official}>{country.name.common}</p>
            )
        )
    }
}

export default Country; 