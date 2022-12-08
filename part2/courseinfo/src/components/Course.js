import React from 'react'

const Course = ({course}) => {

return(
    <>
        <Title name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </>
)
}

const Title = ({name}) => {

    return(
        <h2>{name}</h2>
    );
}

const Content = ({parts}) => {

    return(
        <>
            {parts.map(part => 
                <p key={part.id}>
                    {part.name}
                </p>
            )}
        </>
    );
}

const Total = ({parts}) => {
    
    const total = parts.reduce((a, c) => a + c.exercises, 0);

    return(
        <p><strong>total of {total} exercises</strong></p>
    );
}

const Part = ({part, exercise}) => {

    return(
        <p>
            {part} {exercise}
        </p>
    );
}

export default Course