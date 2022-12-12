import React from 'react'

const PersonForm = (props) => {
    return(
        <form onSubmit={props.addName}>
            <h2>add a new</h2>
            <div>
                name: <input type='text' value={props.newName} onChange={props.nameInputChange}/>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.numberInputChange}/>
            </div>
            <div>
                <button type="submit" onClick={props.addName}>add</button>
            </div>
        </form>
    )
}

export default PersonForm