const connectDB = require('./DbConfiguration/DB')
require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

connectDB().then(() => {
  console.log('connected to database')
})

const userRoutes = require('./Routes/userRoutes')
app.use('/api/v1', userRoutes)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`server started on port number ${PORT}`)
})




