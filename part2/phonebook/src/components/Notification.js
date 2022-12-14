import React from 'react'

const Notification = ({message}) => {
    if(message === null){
        return null
    } 
    else {
        return(
            <p className = 'notification'>
                {message}
            </p>
        )
    }
}

export default Notification