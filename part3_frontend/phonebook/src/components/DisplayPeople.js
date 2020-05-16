import React from 'react'
import Person from './Person'

const DisplayPeople = (props) => {
    return (
        <ul>
        {props.persons.filter((person) => person.name.toLowerCase().includes(props.nameFilter.toLowerCase())
        ).map((person) => 
          <Person 
            key={person.name} 
            person={person} 
            handleDelete={props.handleDelete}
          />)}
      </ul>
    )
}

export default DisplayPeople