import React, { Component } from 'react'
import { connect } from 'react-redux'

import List from './List.js'
import Todo from './Todo.js'
import AddTodo from './AddTodo.js'

import { addTodo, deleteTodo, toggleTodo } from '../actions/todos.js'

class Todos extends Component {
  render() {
    const {
      todos,
      dispatch
    } = this.props

    return(
    <div>
      <h1>Todos</h1>
      <List items={
        todos.map((todo) =>
          <Todo
            content={todo.content}
            completed={todo.completed}
            id={todo.id}
            handleClick={(id) => dispatch(toggleTodo(id))}
            handleDelete={(id) => dispatch(deleteTodo(id))}
          />
        )}
      />
      <AddTodo addHandler={(content) => dispatch(addTodo(content))}/>
    </div>
    )
  }
}

const mapStateToProps = ({ id, todos }) => ({id, todos})
// const mapDispatchToProps = (dispatch) => ({
//   deleteTodo: (id) => dispatch(deleteTodo(id)),
//   addTodo: (content) => dispatch(addTodo(content)),
//   toggleTodo: (id) => dispatch(toggleTodo(id))
// })

export default connect(mapStateToProps)(Todos)
