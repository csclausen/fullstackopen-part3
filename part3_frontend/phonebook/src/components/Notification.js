import React from 'react'

const Notification = (props) => {
  if (props.notification.message === null) {
    return null
  }
  const notificationStyle = props.notification.style === 'success'
    ? {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBotton: 10
    }
    : {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBotton: 10
  }
  return (
    <div style={notificationStyle}>
      {props.notification.message}
    </div>
  )
}

export default Notification