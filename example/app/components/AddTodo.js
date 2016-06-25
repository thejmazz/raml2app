import React, { Component } from 'react'

export default class AddTodo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onClick() {
    const { content } = this.state
    const { addHandler } = this.props

    addHandler(content)
  }

  onChange({ target }) {
    this.setState({
      content: target.value
    })
  }

  render() {
    const { onClick, onChange } = this

    return(
    <div>
      <input type="text" placeholder="new todo" onChange={onChange}/>
      <button onClick={onClick}>Add</button>
    </div>
    )
  }
}
