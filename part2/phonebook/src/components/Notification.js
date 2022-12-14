import React from 'react'

const Notification = ({message}) => {
    if(message === null){
        return null
    } 
    else {     
        return(
            <p className = {message.type === 'notification' ? 'notification' : 'error'}>
                {message.message}
            </p>
        )
    }
}

export default Notification