import React, { Component } from 'react'

import Form from "./Components/Form" // Form that will be open when the (+) button is clicked
import Task from './Components/Task'

import './App.css'


class App extends Component {
  
  constructor(){
    super()

    this.state = {
      isFormOpen: false,
      tasks: []
    }
  }

  lastTime = (date) => {
    const today = new Date() // Today info
    return Math.round(Math.abs(today - new Date(date.replace("-", "/")))/(1000*60*60*24) + 0.5) // Diff in miliseconds to days (rounded to the bigger number)
  }

  loadTasks = () => {
    fetch('/getTasks')
      .then((res) => res.json())
      .then((data) => {

        let dataCopy = structuredClone(data)

        for(let i = 0; i < data.length; i++){
          dataCopy[i]["lastTime"] = this.lastTime(data[i]["info"].split(";")[1])
        }

        dataCopy.sort((a, b) => { // Ordening by remaining time
          return a.lastTime - b.lastTime
        })

        console.log(dataCopy)

        this.setState((previousState) => ({
          isFormOpen: previousState.isFormOpen,
          tasks: dataCopy
        }))
      })
  }

  componentDidMount() {
    this.loadTasks()
  }

  render(){
    const handleClickForm =  () => {

      this.setState((previousState) => ({
        isFormOpen: !previousState.isFormOpen,
        tasks: previousState.tasks
      }))
      
    }

    const addTaskFunction = (name, subject, due) => {

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})

      let init = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({"user": "", "name": name, "checked": false, "info": `${subject};${due}`})
      }

      fetch("/newTask", init).then(() => {this.loadTasks()}) // Waiting the fetch to reload database

    }

    const deleteTaskFunction = (id) => {

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})

      let init = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(id)
      }

      fetch("/deleteTask", init) // Simple way (but in case of low loading it's slow): .then(() => {this.loadTasks()})
      
      // Saving in the state
      let cloneTasks = this.state.tasks.slice()
      let index = this.state.tasks.findIndex(x => x._id === id)

      delete cloneTasks[`${index}`] // Removes the element that has the given index

      this.setState((previousState) => ({
        isFormOpen: previousState.isFormOpen,
        tasks: cloneTasks
      }))

    }

    const checkTaskFunction = (task) => {

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})

      let init = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(task)
      }

      fetch("/checkTask", init)

      // Saving in the state
      let cloneTasks = this.state.tasks.slice()
      let index = this.state.tasks.findIndex(x => x._id === task._id)

      cloneTasks[index]["checked"] = !cloneTasks[index]["checked"]

      this.setState((previousState) => ({
        isFormOpen: previousState.isFormOpen,
        tasks: cloneTasks
      }))

    }

    let screenPopup = this.state.isFormOpen ? (<Form closeFunc={handleClickForm} newTask={addTaskFunction} />) : (<></>)

    return (
      <div className="App">

        {screenPopup}

        {
          this.state.tasks.map((task) => {
            return <Task key={task._id} data={task} deleteFunc={deleteTaskFunction} checkFunc={checkTaskFunction} />
          })
        }
        
        <button className='new_bt' onClick={handleClickForm}>+</button>
      </div>
    )
  }
}

export default App;
