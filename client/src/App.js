import React, { Component } from 'react'

import Form from "./Components/Form" // Form that will be open when the (+) button is clicked
import Task from './Components/Task'


class App extends Component {
  
  constructor(){
    super()

    this.state = {
      isFormOpen: false,
      tasks: []
    }
  }

  loadTasks = () => {
    fetch('/getTasks')
      .then((res) => res.json())
      .then((data) => {
        this.setState((previousState) => ({
          isFormOpen: previousState.isFormOpen,
          tasks: data
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

      fetch("/newTask", init)

    }

    const deleteTaskFunction = (id) => {

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})

      let init = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(id)
      }

      fetch("/deleteTask", init)

    }

    const checkTaskFunction = (id) => {

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})

      let init = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(id)
      }

      fetch("/checkTask", init)

    }

    let screenPopup = this.state.isFormOpen ? (<Form newTask={addTaskFunction} />) : (<></>)

    return (
      <div className="App">

        {screenPopup}

        {
          this.state.tasks.map((task) => {
            return <Task key={task._id} data={task} deleteFunc={deleteTaskFunction} checkFunc={checkTaskFunction} />
          })
        }
        
        <button onClick={handleClickForm}>+</button>
      </div>
    )
  }
}

export default App;
