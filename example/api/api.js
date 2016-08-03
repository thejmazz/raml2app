'use strict'

const koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const pg = require('pg')

// === CONFIGURATION ===
const config = require('./lib/config.js')

// === DATABASE ===
let todos = [{
  content: 'Buy eggs',
  completed: false,
  id: 0
}, {
  content: 'Make lunch',
  completed: false,
  id: 1
}]
let id = 2

const client = new pg.Client(config.pg)

// === ROUTING ===
router.post('/todos', function * () {
  let todo = {
    content: this.request.body.content,
    completed: false,
    id: id
  }

  todos.push(todo)

  id++

  this.body = todo
})

router.get('/todos/all', function * () {
  this.body = todos
})

router.get('/todos/:id', function * () {
  const id = parseInt(this.params.id)

  todos.forEach((todo) => {
    if (todo.id === id) this.body = todos[id]
  })
})

router.put('/todos/:id', function * () {
  const id = parseInt(this.params.id)

  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completed = this.request.body.completed

      this.body = todo
    }
  })
})

router.delete('/todos/:id', function * () {
  const deleteTodo = (id) => {
    const newTodos = []

    todos.forEach((todo) => {
      console.log(todo)
      if (todo.id !== id) {
        newTodos.push(todo)
      }
    })

    return newTodos
  }

  todos = deleteTodo(parseInt(this.params.id))

  this.body = {
    success: true,
    message: `Delete todo with id ${this.params.id}`
  }
})

// === MIDDLEWARE ===
const app = koa()
app.use(cors())
app.use(morgan.middleware('dev'))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

// === LISTEN ===
const listen = ({ port }) => {
  app.listen(port)
  console.log(`Koa server listening on port ${port}`)
}

client.connect((err) => {
  if (err) {
    console.log(err)
    return process.exit(1)
  }

  console.log('Connected to PG')

  listen(config)
})
