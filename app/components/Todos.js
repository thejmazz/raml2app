import React, { Component } from 'react'

import List from './List.js'
import Todo from './Todo.js'
import AddTodo from './AddTodo.js'

export default class Todos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 2,
      todos: [{
        content: 'Buy eggs',
        completed: true,
        id: 0
      }, {
        content: 'Make lunch',
        completed: false,
        id: 1
      }]
    }

    this.handleTodoClick = this.handleTodoClick.bind(this)
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
  }

  handleTodoClick(id) {
    const { todos } = this.state

    todos.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })

    this.setState({
      id: this.state.id,
      todos
    })
  }

  handleAddTodo(content) {
    const { id, todos } = this.state

    todos.push({
      content,
      completed: false,
      id: id+1
    })

    this.setState({
      id: id+1,
      todos
    })
  }

  handleDeleteTodo(id) {
    const { todos } = this.state

    const newTodos = []

    todos.forEach((todo) => {
      if (todo.id !== id) {
        newTodos.push(todo)
      }
    })

    this.setState({
      id: this.state.id,
      todos: newTodos
    })
  }

  render() {
    const {
      handleTodoClick,
      handleAddTodo,
      handleDeleteTodo
    } = this
    const { todos } = this.state

    return(
    <div>
      <h1>Todos</h1>
      <List items={
        todos.map((todo) =>
          <Todo
            content={todo.content}
            completed={todo.completed}
            id={todo.id}
            handleClick={handleTodoClick}
            handleDelete={handleDeleteTodo}
          />
        )}
      />
      <AddTodo addHandler={handleAddTodo}/>
    </div>
    )
  }
}
