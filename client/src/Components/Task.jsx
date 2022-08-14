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
      <div>
        <br />
        <input type="checkbox" id={this.props.data._id} defaultChecked={checked} onChange={() => this.props.checkFunc(this.props.data)} />
        {name} - {subject}
        <br />
        {due}
        <button onClick={() => this.props.deleteFunc(this.props.data._id)}>Delete</button>
        <br />
      </div>
    )
  }
}

export default Task