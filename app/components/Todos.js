import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import List from './List.js'
import Todo from './Todo.js'
import AddTodo from './AddTodo.js'

import * as TodoActionCreators from '../actions/todos.js'

class Todos extends Component {
  render() {
    const {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo
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
            handleClick={toggleTodo}
            handleDelete={deleteTodo}
          />
        )}
      />
      <AddTodo addHandler={addTodo}/>
    </div>
    )
  }
}

const mapStateToProps = ({ todos }) => ({ todos })
const mapDispatchToProps = (dispatch) => bindActionCreators(TodoActionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
