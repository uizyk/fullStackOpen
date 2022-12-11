import React from 'react';

const Country = ({filtered, area, capital, languages}) => {

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
                <h2>{country.name}</h2>
                {/* <br/>
                <p>{country.capital}</p>
                <p>area: {country.area}</p> */}
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