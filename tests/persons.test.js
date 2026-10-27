const { test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../index')
const Person = require('../models/person')

const api = supertest(app)

const initialPersons = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44532352' },
]

before(async () => {
  require('dotenv').config()
  await mongoose.connect(process.env.MONGODB_URI_TEST)
})

beforeEach(async () => {
  await Person.deleteMany({})
  await Person.insertMany(initialPersons)
})

after(async () => {
  await mongoose.connection.close()
})

test('we see two people', async() => {
  const response = await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.equal(response.body.length, initialPersons.length)
})

test('we see specific contact', async () => {
  const response = await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const ada = response.body.find(
    person => person.name === 'Ada Lovelace'
  )

  assert.equal(response.body.length, initialPersons.length)
  assert(ada)
  assert.equal(ada.number, '39-44532352')
})

test('a contact can be added', async () => {
  const newPerson = {
    name: 'Matti Meikäläinen',
    number: '040-123456',
  }

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(200)

  const persons = await Person.find({})

  assert.equal(persons.length, initialPersons.length + 1)
  assert(persons.some(person => person.name === newPerson.name))
})