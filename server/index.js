const express = require('express')
const mongoose = require('mongoose')
const path = require('path')


// Database Configurarion

mongoose.connect('mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/SimpleTask?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

//mongoose.models = {} // To create a new Schema/Model

let taskSchema = new mongoose.Schema({
    user: String,
    name: String,
    checked: Boolean,
    info: String 
}) // Info can have many aspects, like due time, dataAdded, subject, ...

let tasks = mongoose.model('tasks', taskSchema) // MongoDB model

// API Configuration

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req,res) => {
    res.json({message: "Hello World!"})
})

app.listen(PORT, () => {
    console.log(`App running... on port ${PORT}`)
})