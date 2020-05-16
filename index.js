const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
morgan.token('body', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : ''})

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))


let persons = [
  {
    name: "Arto Hellas",
    number: "",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "charlie",
    number: "123",
    id: 4
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


const validatePayloadForCreate = (body) => {
  if (!body.name) {
    return 'name'
  }
  else if (!body.number) {
    return 'number'
  }
  return false
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  const missing = validatePayloadForCreate(body)
  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  else if (missing) {
    return response.status(400).json({
      error: `missing ${missing}`
    })
  }
  
  const newPerson = {
    id: persons.length > 0
      ? Math.max(...persons.map(n => n.id)) + 1
      : 0,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})


app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  if (!body || body.number === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const id = Number(request.params.id)
  const number = body.number
  const updatedPerson = persons.find(person => person.id === id)

  if (!updatedPerson) {
    return response.status(404).json({
      error: 'person not found'
    })
  }

  updatedPerson.number = number
  persons = persons.map(person => person.id !== id ? person : updatedPerson)

  response.json(updatedPerson)
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})