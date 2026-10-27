
require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./index')

const PORT = process.env.PORT || 3001

const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI

mongoose.connect(databaseUrl, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
    process.exit(1)
  })
