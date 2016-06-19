'use strict'

const koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')


// === DATABASE ===
const todos = [{
  content: 'Buy eggs',
  completed: false,
  id: 0
}, {
  content: 'Make lunch',
  completed: false,
  id: 1
}]
let id = 2

// === ROUTING ===
router.post('/todos', function * () {
  todos.push({
    content: this.request.body.content,
    completed: false,
    id: id
  })

  todos.forEach((todo) => {
    if (todo.id === id) {
      this.body = todos[id]
    }
  })

  id++
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

// === MIDDLEWARE ===
const app = koa()
app.use(morgan.middleware('dev'))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
console.log('Koa server listening on port 3000')
