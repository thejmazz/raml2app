'use strict'

require('dotenv').config()

const koa = require('koa')
const router = require('koa-router')()
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const pg = require('pg')

// === CONFIGURATION ===
const PORT = process.env.API_PORT

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

const pgConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.API_PG_HOST,
  database: process.env.PG_DBNAME
}

const client = new pg.Client(pgConfig)

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
const listen = () => {
  app.listen(PORT)
  console.log(`Koa server listening on port ${PORT}`)
}

client.connect((err) => {
  if (err) {
    console.log(err)
    return process.exit(1)
  }

  console.log('Connected to PG')

  listen()
})
