import React from 'react'

const Filter = (props) => {
  return (
    <div>shown with filter: 
      <input 
        value={props.nameFilter}
        onChange={props.handleNameFilter}
      />
    </div>
  )
}

export default Filter