import React, { Component } from 'react'

class Task extends Component {
  render() {
    return (
      <div>{this.props.data.name}</div>
    )
  }
}

export default Task