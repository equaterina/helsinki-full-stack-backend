const express = require("express");
var morgan = require('morgan')

const app = express();


app.use(express.json())
app.use(morgan('tiny'));


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook app!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people.</p> <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: "There's no person with this id. Are you sure you know them?" })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'You must provide a number and a name'
    })
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'This person is already registered in the phonebook'
    })
  }

  const person = {
    number: body.number,
    name: body.name,
    // 100000000000 - uppper bound, persons.length - lower bound to prevent overlap
    id: Math.random() * (1000000000000 - persons.length) + persons.length,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)