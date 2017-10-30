const express = require('express')
const app = express()

app.get('/', (request, response) => {
  throw new Error('oops')
})

app.use((err, request, response, next) => {
  //Log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke')
})