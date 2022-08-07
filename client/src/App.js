import React, { Component } from 'react'

import Form from "./Components/Form" // Form that will be open when the (+) button is clicked


class App extends Component {
  
  constructor(){
    super()

    this.state = {
      isFormOpen: false,
      tasks: {}
    }
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
        .then((data) => {
          console.log("Posted")
        })
    }

    let screenPopup = this.state.isFormOpen ? (<Form newTask={addTaskFunction} />) : (<></>)

    return (
      <div className="App">

        {screenPopup}
        
        <button onClick={handleClickForm}>+</button>
      </div>
    )
  }
}

export default App;
