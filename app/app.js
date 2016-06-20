import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Todos from './components/Todos.js'

import rootReducer from './reducers'

const init = () => {
  const app = document.createElement('app')
  document.body.appendChild(app)

  const store = createStore(rootReducer)

  render(
  <Provider store={store}>
    <Todos/>
  </Provider>, app)
}

init()
