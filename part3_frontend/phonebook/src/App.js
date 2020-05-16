import React, { useState, useEffect } from 'react'
import AddPerson from './components/AddPerson'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification ] = useState({
    style: '',
    message: null
  })

  const hook = () => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }

  useEffect(hook, [])

  const flashNotification = (newNotification) => {
    setNotification(newNotification)
    setTimeout(() => {
      setNotification({style: '', message: null})
    }, 2500)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some((person) =>
      person.name === newName && person.number === newNumber
    )) {
      const newNotification = { 
        style: 'error', 
        message: `${newName} already in phonebook`
      }
      flashNotification(newNotification)
    }
    else if (persons.some((person) =>
      person.name === newName
    )) {
      const confirmed = window.confirm(
        `${newName} is already in the phonebook.  Do you wish to replace their number with ${newNumber}?`
      )
      if (confirmed) {
        const existingPerson = persons.find(person => 
          person.name === newName
        )
        const newPerson = {
          ...existingPerson,
          number: newNumber
        }
        personService
          .update(newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== newPerson.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
        })
        const newNotification = {
          style: 'success',
          message: `${newName}'s number updated`
        }
        flashNotification(newNotification)
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      if (newName !== '' && newNumber !== '') {
        personService
          .create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
            const newNotification = {
              style: 'success',
              message: `${newName} added`
            }
            flashNotification(newNotification)
          })
      }
      else {
        const newNotification = {
          style: 'error',
          message: 'name and number required'
        }
        flashNotification(newNotification)
      }
    }
  }

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDelete = (event) => {
    const id = event.target.value
    const confirmed = window.confirm(
      'Do you wish to delete this entry?'
    )
    if (confirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          const deletedPersonName = persons.find(person => person.id === parseInt(id)).name
          setPersons(persons.filter(person => person.id !== parseInt(id)))
          const newNotification = {
            style: 'success',
            message: `${deletedPersonName} deleted`
          }
          flashNotification(newNotification)
        })
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        notification={notification}
      />
      <Filter 
        nameFilter={nameFilter}
        handleNameFilter={handleNameFilter}
      />
      <h3>add new</h3>
      <AddPerson 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <DisplayPeople
        persons={persons} 
        nameFilter={nameFilter} 
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
