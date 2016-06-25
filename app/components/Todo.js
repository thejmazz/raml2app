import React, { Component } from 'react'

export default class Todo extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onClick() {
    const { id, completed, handleClick } = this.props

    handleClick(id, completed)
  }

  onDelete() {
    const { id, handleDelete } = this.props

    handleDelete(id)
  }

  render() {
    const { onClick, onDelete } = this
    const { content, completed } = this.props

    const styles = completed ? { textDecoration: 'line-through' } : {}

    return(
      <div>
        <span style={styles} onClick={onClick}>{content}</span>
        &nbsp;
        <button onClick={onDelete}>X</button>
      </div>
    )
  }
}
