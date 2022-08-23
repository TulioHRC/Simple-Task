import React, { Component } from 'react'

class Task extends Component {
  render() {
    let name = this.props.data.name
    let checked = this.props.data.checked
    let due = this.props.data.info.split(";")[1]
    let subject = this.props.data.info.split(";")[0]

    // Date prettier
    due = `${due.split("-")[2]}-${due.split("-")[1]}-${due.split("-")[0]}`

    return (
      <div className='task'>
        <div className='container' htmlFor={this.props.data._id}>
          <input type="checkbox" className="check" id={this.props.data._id} defaultChecked={checked} onChange={() => this.props.checkFunc(this.props.data)} />
          <label className='checkmark'></label>
          {name} - {subject}
        </div>
        
        {due}
        <button className='new_bt' id='delete_bt' onClick={() => this.props.deleteFunc(this.props.data._id)}>Delete</button>
      </div>
    )
  }
}

export default Task