import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../constants/todos.js'

export const deleteTodo = (id) => ({ type: DELETE_TODO, id })
export const addTodo = (content) => ({type: ADD_TODO, content })
export const toggleTodo = (id) => ({type: TOGGLE_TODO, id})
