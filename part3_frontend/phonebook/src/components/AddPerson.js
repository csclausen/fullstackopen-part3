import React from 'react'

const AddPerson = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input 
            value={props.newName}
            onChange={props.handleNewPerson}
          />
        </div>
        <div>
          number: <input 
            value={props.newNumber}
            onChange={props.handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson