// Database Configurarion

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//let jsonParser = bodyParser.json()
 
let urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect('mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/SimpleTask?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

//mongoose.models = {} // To create a new Schema/Model

let taskSchema = new mongoose.Schema({
    user: String,
    name: String,
    checked: Boolean,
    info: String 
}) // Info can have many aspects, like due time, dataAdded, subject, ...

let tasks = mongoose.model('tasks', taskSchema) // MongoDB model

// Main Function

module.exports = (app) => {

    app.post('/newTask', urlencodedParser, (req, res) => {
        //let task = new tasks(JSON.parse(Object.keys(req.body)))
        console.log(req.body)
        res.send()
    })

    console.log("MongoDB connection made...")
}