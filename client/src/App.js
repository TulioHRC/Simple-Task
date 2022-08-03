import React, { Component } from 'react'

import Form from "./Components/Form" // Form that will be open when the (+) button is clicked


class App extends Component {
  
  constructor(){
    super()

    this.state = {
      isFormOpen: false
    }
  }

  render(){
    const handleClickForm =  () => {

      this.setState((previousState) => ({
        isFormOpen: !previousState.isFormOpen
      }))
      
    }

    let screenPopup = this.state.isFormOpen ? (<Form />) : (<></>)

    return (
      <div className="App">

        {screenPopup}
        
        <button onClick={handleClickForm}>+</button>
      </div>
    )
  }
}

export default App;
