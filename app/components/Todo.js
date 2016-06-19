import React, { Component } from 'react'

export default class Todo extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onClick() {
    const { id, handleClick } = this.props

    handleClick(id)
  }

  onDelete() {
    const { id, handleDelete } = this.props

    handleDelete(id)
  }

  render() {
    const { onClick, onDelete } = this
    const { content, completed } = this.props

    // Use IIFE to avoid `let`ing what is not going to change
    const styles = (() => {
      if (completed) {
        return { textDecoration: 'line-through' }
      } else {
        return {}
      }
    })()

    // or this, but wont be as good for bigger things:
    // (and won't work for try/catch)
    // const styles = completed ? { textDecoration: 'line-through' } : {}

    // `let` doesn't make sense here because we don't plan on changing styles
    // let styles = {}
    // if (completed) {
    //   styles = {
    //     textDecoration: 'line-through'
    //   }
    // }

    return(
      <div>
        <span style={styles} onClick={onClick}>{content}</span>
        &nbsp;
        <button onClick={onDelete}>X</button>
      </div>
    )
  }
}
