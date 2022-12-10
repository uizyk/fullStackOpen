import React from 'react';

const Country = ({filtered, input}) => {

    if(filtered.length > 11){
        if(filtered.length === 250){
            return(
                <p>Type above to find a country</p>
            )
        // }
        // else if(filtered.length === 0){
        //     return(
        //         <p>No results</p>
        //     )
        }
        else {
            return(
                <p>Too many matches, specify another filter</p>
            )
        }

    } else {
        return(
            filtered.map(country =>            
                <p key={country.name.official}>{country.name.common}</p>
            )
        )
    }
}

export default Country; 