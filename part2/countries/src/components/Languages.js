import React from "react";

const Languages = ({languages}) => {

    const languageItems = Object.values(languages).map((language) => 
        <li key={language}>{language}</li>
    )

    return(
        <>
            <p><strong>languages</strong></p>
            <ul>
                {languageItems}
            </ul>
        </>
        )
    
}

export default Languages