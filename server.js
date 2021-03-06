const express = require('express')
const connectDB = require('./config/db')

const path = require('path')
const fileupload = require('express-fileupload')

const app = express()

// Provide parsing for file uploads
app.use(fileupload())

// Connect Database

connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/strava', require('./routes/strava'))
app.use('/api/races', require('./routes/races'))

// Serve Static Files

app.use(express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
