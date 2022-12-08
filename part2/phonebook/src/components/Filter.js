import React from 'react'

const Filter = ({filter, filterInput}) => {
    return(
        <p>
            filter shown with<input value={filter} onChange={filterInput}/>
        </p>
    )
}

export default Filter