import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../constants/todos.js'

const defaultTodos = [{
  content: 'Buy eggs',
  completed: true,
  id: 0
}, {
  content: 'Make lunch',
  completed: false,
  id: 1
}]

const makeNewState = (state) => {
  const newTodos = []
  state.forEach(todo => newTodos.push(todo))

  return newTodos
}

const deleteTodo = (id, todos) => {
  const newTodos = []

  todos.forEach((todo) => {
    if (todo.id !== id) {
      newTodos.push(todo)
    }
  })

  return newTodos
}

const addTodo = (content, state) => {
  const newTodos = makeNewState(state)

  const maxId = (() => {
    if (newTodos.length === 0) {
      return 0
    }

    let maxId = newTodos[0].id
    for (let i=1; i < newTodos.length; i++) {
      const { id } = newTodos[i]

      if (id > maxId) {
        maxId = id
      }
    }

    return maxId
  })()

  newTodos.push({
    content,
    completed: false,
    id: maxId+1
  })

  return newTodos
}

const toggleTodo = (id, state) => {
  const newTodos = makeNewState(state)

  newTodos.forEach((todo) => {
    if (id === todo.id) {
      todo.completed = !todo.completed
    }
  })

  return newTodos
}

export default (state = defaultTodos, action) => {
  const { type } = action

  switch (type) {
    case DELETE_TODO:
      return deleteTodo(action.id, state)
      break
    case ADD_TODO:
      return addTodo(action.content, state)
      break
    case TOGGLE_TODO:
      return toggleTodo(action.id, state)
      break
    default:
      return state
  }
}
