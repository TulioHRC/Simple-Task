const express = require('express')
const path = require('path')

// API Configuration

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));

// MongoDB
const mongoControl = require('./controllers/mongoDB')

mongoControl(app)

app.listen(PORT, () => {
    console.log(`App running... on port ${PORT}`)
})