import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
  TOGGLE_TODO
} from '../constants/todos.js'

import { BASE_URL } from '../constants'

import { ajax, get } from '../util'

export const getTodos = () => (dispatch) => {
  get(BASE_URL + '/todos/all')
  .then(data => dispatch({ type: GET_TODOS, todos: data }))
}

export const deleteTodo = (id) => (dispatch) => {
  ajax(BASE_URL + `/todos/${id}`, {}, 'DELETE')
  .then((data) => {
    console.log(data)

    dispatch({ type: DELETE_TODO, id })
  })
}

export const addTodo = (content) => (dispatch) => {
  ajax(BASE_URL + '/todos', { content })
  .then((data) => {
    console.log(data)
    dispatch({type: ADD_TODO, content: data.content })
  })
}

export const toggleTodo = (id, completed) => (dispatch) => {
  ajax(BASE_URL + `/todos/${id}`, undefined, 'PUT')
  .then((data) => {
    console.log(data)

    dispatch({type: TOGGLE_TODO, id})
  })
}
