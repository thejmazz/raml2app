import React from 'react'
import { render } from 'react-dom'

import Todos from './components/Todos.js'

const app = document.createElement('app')
document.body.appendChild(app)

render(<Todos/>, app)
