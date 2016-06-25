import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
  TOGGLE_TODO
} from '../constants/todos.js'

import { ajax, get } from '../util'

export const getTodos = () => (dispatch) => {
  get('http://localhost:3000/todos/all')
  .then(data => dispatch({ type: GET_TODOS, todos: data }))
}

export const deleteTodo = (id) => (dispatch) => {
  ajax(`http://localhost:3000/todos/${id}`, {}, 'DELETE')
  .then((data) => {
    console.log(data)

    dispatch({ type: DELETE_TODO, id })
  })
}

export const addTodo = (content) => (dispatch) => {
  ajax('http://localhost:3000/todos', { content })
  .then((data) => {
    console.log(data)
    dispatch({type: ADD_TODO, content: data.content })
  })
}

export const toggleTodo = (id, completed) => (dispatch) => {
  ajax(`http://localhost:3000/todos/${id}`, { completed: !completed }, 'PUT')
  .then((data) => {
    console.log(data)

    dispatch({type: TOGGLE_TODO, id})
  })
}
