require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const error = require('./middlewares/error')
const authenticate = require('./middlewares/authenticate')
const todoRoute = require('./routes/todoRoute')
const authRoute = require('./routes/authRoute')
const app = express()

app.use(cors())
app.use(express.json()) 

app.use('/auth', authRoute)
app.use('/todos',authenticate, todoRoute)

app.use(notFound)
app.use(error)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on port', port))