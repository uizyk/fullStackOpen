import React from 'react'

const Person = ({personName, personNumber, deletePerson}) => {

    return(
        <p>{personName} {personNumber} <button onClick={deletePerson}>delete</button></p>
    )
}

export default Person